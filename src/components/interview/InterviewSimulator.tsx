import React from 'react';
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
import { Mic, MicOff, Play, Pause, SkipBack, Volume2, Timer, AlertCircle, FileText, MessageSquare, Clock, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { elevenLabsService, ELEVEN_LABS_VOICES } from "@/services/elevenLabsService";
import { interviewsManager } from "@/lib/supabase";
import { claudeService, CLAUDE_MODELS, AI_PERSONALITIES } from "@/services/claudeService";
import { AudioVisualizer } from "@/components/interview/AudioVisualizer";
import { InterviewFeedback } from "@/components/interview/InterviewFeedback";
import { InterviewSetup } from "@/components/interview/InterviewSetup";

interface InterviewSimulatorProps {
  selectedInterview?: {
    id: string;
    title: string;
    job_title: string;
    interviewer_type: string;
    status: string;
    settings?: Record<string, any>;
    [key: string]: any;
  };
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
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userResponse, setUserResponse] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [volume, setVolume] = useState(80);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [timerIntervalId, setTimerIntervalId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const startNewInterview = async (interviewData) => {
    try {
      setIsLoading(true);
      
      const savedInterview = await interviewsManager.createInterview({
        user_id: user.id,
        title: `${interviewData.jobTitle} - ${interviewData.interviewType}`,
        job_title: interviewData.jobTitle,
        interviewer_type: interviewData.interviewer,
        settings: JSON.stringify({
          difficultyLevel: interviewData.difficultyLevel,
          focusAreas: interviewData.focusAreas,
          timeLimit: interviewData.timeLimit,
          customQuestions: interviewData.customQuestions
        }),
        status: "in_progress",
      });
      
      const focusAreasText = interviewData.focusAreas.length > 0 
        ? `with focus on ${interviewData.focusAreas.join(", ")}` 
        : "";
        
      const questionPrompt = `Generate 5 ${interviewData.interviewType} interview questions for a ${interviewData.difficultyLevel} ${interviewData.jobTitle} position ${focusAreasText}. 
        Format as JSON array with objects containing: 
        { 
          "question": "question text", 
          "context": "what this question is testing", 
          "keyPoints": ["key points to address"], 
          "exampleStructure": "example response structure",
          "relatedQuestions": ["2-3 related follow-up questions"]
        }`;
      
      const systemPrompt = AI_PERSONALITIES.INTERVIEWER;
      const questionsText = await claudeService.generateResponse(
        [{ role: "user", content: questionPrompt }],
        systemPrompt,
        CLAUDE_MODELS.CLAUDE_3_HAIKU
      );
      
      const parsedQuestions = JSON.parse(questionsText);
      
      if (interviewData.customQuestions && interviewData.customQuestions.length > 0) {
        for (const customQ of interviewData.customQuestions) {
          parsedQuestions.push({
            question: customQ,
            context: "Custom question provided by you",
            keyPoints: ["This is a custom question - use your own judgment on how to approach it"],
            exampleStructure: "No specific structure provided",
            relatedQuestions: []
          });
        }
      }
      
      setCurrentInterview({
        ...savedInterview,
        settings: JSON.parse(savedInterview.settings || '{}')
      });
      setQuestions(parsedQuestions);
      setCurrentQuestion(parsedQuestions[0]);
      setCurrentQuestionIndex(0);
      setRelatedQuestions(parsedQuestions[0].relatedQuestions || []);
      setInterviewState("active");
      
      if (interviewData.timeLimit) {
        setTimeRemaining(interviewData.timeLimit * 60);
      }
      
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
  
  const generateQuestionAudio = async (questionText, voiceId) => {
    try {
      setIsLoading(true);
      const audioBlob = await elevenLabsService.textToSpeech(questionText, voiceId);
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      
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
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
      
      toast({
        title: "Recording Stopped",
        description: "Your response has been recorded.",
      });
    }
  };
  
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
  
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };
  
  const goToNextQuestion = () => {
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
      setTimerIntervalId(null);
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex]);
      setRelatedQuestions(questions[nextIndex].relatedQuestions || []);
      setUserResponse("");
      
      if (currentInterview?.settings?.timeLimit) {
        setTimeRemaining(currentInterview.settings.timeLimit * 60);
        startTimer();
      }
      
      const voiceId = currentInterview ? 
        getVoiceIdForInterviewer(currentInterview.interviewer_type) : 
        ELEVEN_LABS_VOICES.INTERVIEWER_MALE.voice_id;
      
      generateQuestionAudio(questions[nextIndex].question, voiceId);
    } else {
      setInterviewState("feedback");
    }
  };
  
  const goToPreviousQuestion = () => {
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
      setTimerIntervalId(null);
    }
    
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      setCurrentQuestion(questions[prevIndex]);
      setRelatedQuestions(questions[prevIndex].relatedQuestions || []);
      
      if (currentInterview?.settings?.timeLimit) {
        setTimeRemaining(currentInterview.settings.timeLimit * 60);
        startTimer();
      }
      
      const voiceId = currentInterview ? 
        getVoiceIdForInterviewer(currentInterview.interviewer_type) : 
        ELEVEN_LABS_VOICES.INTERVIEWER_MALE.voice_id;
      
      generateQuestionAudio(questions[prevIndex].question, voiceId);
    }
  };
  
  const startTimer = () => {
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
    }
    
    const intervalId = window.setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 0) {
          clearInterval(intervalId);
          toast({
            title: "Time's up!",
            description: "Your time for this question has ended.",
            variant: "destructive",
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setTimerIntervalId(intervalId);
    return intervalId;
  };
  
  const formatTimeRemaining = (seconds) => {
    if (seconds === null) return null;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const submitFeedback = async (feedback) => {
    try {
      setIsLoading(true);
      
      if (currentInterview) {
        await interviewsManager.updateInterview(currentInterview.id, {
          status: "completed",
          feedback: JSON.stringify(feedback),
        });
        
        toast({
          title: "Interview Completed",
          description: "Your practice interview has been saved with feedback.",
        });
      }
      
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
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        setIsPlaying(false);
        
        if (timeRemaining !== null && currentInterview?.settings?.timeLimit && !timerIntervalId) {
          startTimer();
        }
      };
    }
  }, [audioRef.current, timeRemaining, currentInterview?.settings?.timeLimit]);
  
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      
      if (timerIntervalId) {
        clearInterval(timerIntervalId);
      }
    };
  }, [audioUrl, timerIntervalId]);
  
  useEffect(() => {
    if (currentQuestion && currentQuestion.relatedQuestions) {
      setRelatedQuestions(currentQuestion.relatedQuestions);
    } else {
      setRelatedQuestions([]);
    }
  }, [currentQuestion]);
  
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
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Badge variant="outline" className="px-3 py-1">
              <FileText className="w-4 h-4 mr-1" />
              Question {currentQuestionIndex + 1}
            </Badge>
            <div className="flex items-center space-x-2">
              {timeRemaining !== null && (
                <div className={`flex items-center space-x-1 mr-4 ${timeRemaining < 60 ? 'text-red-500' : ''}`}>
                  <Clock className="h-4 w-4" />
                  <span>{formatTimeRemaining(timeRemaining)}</span>
                </div>
              )}
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
        
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">What This Question Is Testing:</h4>
          <p className="text-muted-foreground">{currentQuestion?.context}</p>
          
          <h4 className="font-medium mt-4 mb-2">Key Points to Address:</h4>
          <ul className="list-disc pl-5 text-muted-foreground">
            {currentQuestion?.keyPoints?.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          
          {relatedQuestions && relatedQuestions.length > 0 && (
            <>
              <h4 className="font-medium mt-4 mb-2">Related Follow-up Questions:</h4>
              <ul className="list-disc pl-5 text-muted-foreground">
                {relatedQuestions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        
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
