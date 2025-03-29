
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Mic, MicOff, Play, Pause, SkipBack, Volume2, Timer, AlertCircle, FileText, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { elevenLabsService, ELEVEN_LABS_VOICES } from "@/services/elevenLabsService";
import { interviewsManager } from "@/lib/supabase";
import { claudeService, CLAUDE_MODELS, AI_PERSONALITIES } from "@/services/claudeService";
import { AudioVisualizer } from "@/components/interview/AudioVisualizer";
import { InterviewFeedback } from "@/components/interview/InterviewFeedback";
import { InterviewSetup } from "@/components/interview/InterviewSetup";

interface InterviewSimulatorProps {
  selectedInterview?: any; // Existing interview data if continuing
  onExit: () => void;
}

export function InterviewSimulator({ selectedInterview, onExit }: InterviewSimulatorProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [interviewState, setInterviewState] = useState<"setup" | "active" | "feedback">(
    selectedInterview ? "active" : "setup"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [currentInterview, setCurrentInterview] = useState(selectedInterview || null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userResponse, setUserResponse] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [volume, setVolume] = useState(80);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  // Setup a new interview
  const startNewInterview = async (interviewData) => {
    try {
      setIsLoading(true);
      
      // Save the new interview to the database
      const savedInterview = await interviewsManager.createInterview({
        user_id: user.id,
        title: `${interviewData.jobTitle} - ${interviewData.interviewType}`,
        job_title: interviewData.jobTitle,
        interviewer_type: interviewData.interviewer,
        status: "in_progress",
      });
      
      // Generate interview questions based on job title and interview type
      const questionPrompt = `Generate 5 ${interviewData.interviewType} interview questions for a ${interviewData.difficultyLevel} ${interviewData.jobTitle} position. 
        Format as JSON array with objects containing: 
        { 
          "question": "question text", 
          "context": "what this question is testing", 
          "keyPoints": ["key points to address"], 
          "exampleStructure": "example response structure" 
        }`;
      
      const systemPrompt = AI_PERSONALITIES.INTERVIEWER;
      const questionsText = await claudeService.generateResponse(
        [{ role: "user", content: questionPrompt }],
        systemPrompt,
        CLAUDE_MODELS.CLAUDE_3_HAIKU
      );
      
      // Parse questions from the response
      const parsedQuestions = JSON.parse(questionsText);
      
      setCurrentInterview(savedInterview);
      setQuestions(parsedQuestions);
      setCurrentQuestion(parsedQuestions[0]);
      setCurrentQuestionIndex(0);
      setInterviewState("active");
      
      // Generate audio for the first question
      const voiceId = getVoiceIdForInterviewer(interviewData.interviewer);
      generateQuestionAudio(parsedQuestions[0].question, voiceId);
      
    } catch (error) {
      console.error("Error starting interview:", error);
      toast({
        title: "Error",
        description: "Failed to start the interview. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get voice ID based on interviewer type
  const getVoiceIdForInterviewer = (interviewerType) => {
    switch (interviewerType) {
      case "technical_male":
        return ELEVEN_LABS_VOICES.INTERVIEWER_MALE.voice_id;
      case "technical_female":
        return ELEVEN_LABS_VOICES.INTERVIEWER_FEMALE.voice_id;
      case "coach":
        return ELEVEN_LABS_VOICES.COACH.voice_id;
      default:
        return ELEVEN_LABS_VOICES.INTERVIEWER_MALE.voice_id;
    }
  };
  
  // Generate audio for a question
  const generateQuestionAudio = async (questionText, voiceId) => {
    try {
      setIsLoading(true);
      const audioBlob = await elevenLabsService.textToSpeech(questionText, voiceId);
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      
      // Auto-play the question after loading
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.volume = volume / 100;
          audioRef.current.play();
          setIsPlaying(true);
        }
      }, 500);
    } catch (error) {
      console.error("Error generating audio:", error);
      toast({
        title: "Audio Error",
        description: "Failed to generate audio for the question.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Start recording user response
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        // Save the audio URL or process the recording as needed
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording Started",
        description: "We're now recording your response.",
      });
    } catch (error) {
      console.error("Error starting recording:", error);
      toast({
        title: "Recording Error",
        description: "Could not access microphone. Please check your permissions.",
        variant: "destructive",
      });
    }
  };
  
  // Stop recording user response
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Close the audio tracks to release the microphone
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
      
      toast({
        title: "Recording Stopped",
        description: "Your response has been recorded.",
      });
    }
  };
  
  // Handle audio playback controls
  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const replayQuestion = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  
  // Update volume
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };
  
  // Move to next/previous question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex]);
      setUserResponse("");
      
      // Generate audio for the next question
      const voiceId = currentInterview ? 
        getVoiceIdForInterviewer(currentInterview.interviewer_type) : 
        ELEVEN_LABS_VOICES.INTERVIEWER_MALE.voice_id;
      
      generateQuestionAudio(questions[nextIndex].question, voiceId);
    } else {
      // All questions answered, move to feedback
      setInterviewState("feedback");
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      setCurrentQuestion(questions[prevIndex]);
      
      // Generate audio for the previous question
      const voiceId = currentInterview ? 
        getVoiceIdForInterviewer(currentInterview.interviewer_type) : 
        ELEVEN_LABS_VOICES.INTERVIEWER_MALE.voice_id;
      
      generateQuestionAudio(questions[prevIndex].question, voiceId);
    }
  };
  
  // Submit feedback for the interview
  const submitFeedback = async (feedback) => {
    try {
      setIsLoading(true);
      
      if (currentInterview) {
        // Update interview status and add feedback
        await interviewsManager.updateInterview(currentInterview.id, {
          status: "completed",
          feedback: JSON.stringify(feedback),
        });
        
        toast({
          title: "Interview Completed",
          description: "Your practice interview has been saved with feedback.",
        });
      }
      
      // Return to dashboard
      onExit();
    } catch (error) {
      console.error("Error saving feedback:", error);
      toast({
        title: "Error",
        description: "Failed to save interview feedback.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle audio ended event
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }
  }, [audioRef.current]);
  
  // Cleanup audio URLs when component unmounts
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);
  
  // Render different states of the interview
  if (interviewState === "setup") {
    return <InterviewSetup onStartInterview={startNewInterview} onCancel={onExit} />;
  }
  
  if (interviewState === "feedback") {
    return (
      <InterviewFeedback 
        interview={currentInterview}
        questions={questions}
        onSubmit={submitFeedback}
        onBack={() => setInterviewState("active")}
      />
    );
  }
  
  // Active interview state
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={`/avatars/${currentInterview?.interviewer_type || 'default'}.jpg`} />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{currentInterview?.title || "Interview Practice"}</CardTitle>
              <CardDescription>
                Question {currentQuestionIndex + 1} of {questions.length}
              </CardDescription>
            </div>
          </div>
          <Button variant="outline" onClick={onExit}>Exit</Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Question Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Badge variant="outline" className="px-3 py-1">
              <FileText className="w-4 h-4 mr-1" />
              Question {currentQuestionIndex + 1}
            </Badge>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={replayQuestion}
                disabled={isLoading || !audioUrl}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={togglePlayback}
                disabled={isLoading || !audioUrl}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <div className="w-24">
                <Slider 
                  value={[volume]} 
                  min={0} 
                  max={100} 
                  step={1} 
                  onValueChange={handleVolumeChange} 
                />
              </div>
              <Volume2 className="h-4 w-4" />
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-md">
            <p className="font-medium">{currentQuestion?.question}</p>
          </div>
          
          <AudioVisualizer isPlaying={isPlaying} />
          
          <audio 
            ref={audioRef} 
            src={audioUrl} 
            className="hidden"
            onEnded={() => setIsPlaying(false)}
          />
        </div>
        
        {/* Context and Hints */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">What This Question Is Testing:</h4>
          <p className="text-muted-foreground">{currentQuestion?.context}</p>
          
          <h4 className="font-medium mt-4 mb-2">Key Points to Address:</h4>
          <ul className="list-disc pl-5 text-muted-foreground">
            {currentQuestion?.keyPoints?.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
        
        {/* Response Section */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Your Response</h3>
            <div className="flex space-x-2">
              <Button 
                variant={isRecording ? "destructive" : "outline"} 
                size="sm"
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? (
                  <>
                    <MicOff className="mr-2 h-4 w-4" /> Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-4 w-4" /> Record Answer
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <Textarea 
            value={userResponse} 
            onChange={(e) => setUserResponse(e.target.value)}
            placeholder="Type your response here..."
            className="min-h-[150px]"
          />
        </div>
      </CardContent>
      
      <CardFooter className="justify-between">
        <Button 
          variant="outline" 
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous Question
        </Button>
        <Button onClick={goToNextQuestion}>
          {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish & Get Feedback"}
        </Button>
      </CardFooter>
    </Card>
  );
}
