import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { 
  Star, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  LineChart,
  FileText, 
  Video 
} from "lucide-react";
import { claudeService, CLAUDE_MODELS, AI_PERSONALITIES } from "@/services/claudeService";

interface InterviewFeedbackProps {
  interview: any;
  questions: any[];
  onSubmit: (feedback: any) => void;
  onBack: () => void;
}

export function InterviewFeedback({ interview, questions, onSubmit, onBack }: InterviewFeedbackProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<any>(null);
  
  useEffect(() => {
    generateFeedback();
  }, []);
  
  const generateFeedback = async () => {
    try {
      setIsLoading(true);
      
      const prompt = `
        You are an expert interview coach analyzing a practice interview session.
        
        Interview details:
        - Job Title: ${interview.job_title}
        - Interview Type: ${interview.title.split(' - ')[1] || 'Technical'}
        
        Questions asked:
        ${questions.map((q, i) => `${i + 1}. ${q.question}`).join('\n')}
        
        Please provide comprehensive interview feedback with the following sections:
        
        1. Overall Assessment (scale 1-10)
        2. Strengths (3-5 bullet points)
        3. Areas for Improvement (3-5 bullet points)
        4. Specific Feedback for Each Question
        5. Recommended Resources for Improvement
        6. Next Steps and Action Plan
        
        Format your entire response as a JSON object with the following structure:
        {
          "overallScore": number,
          "summary": "brief overall assessment",
          "strengths": ["strength 1", "strength 2", ...],
          "areasForImprovement": ["area 1", "area 2", ...],
          "questionFeedback": [
            {
              "question": "question text",
              "feedback": "detailed feedback",
              "score": number
            },
            ...
          ],
          "recommendedResources": [
            {
              "title": "resource title",
              "type": "article|video|course|book",
              "description": "brief description"
            },
            ...
          ],
          "actionPlan": [
            "action item 1",
            "action item 2",
            ...
          ]
        }
      `;
      
      const feedbackResponse = await claudeService.generateResponse(
        [{ role: "user", content: prompt }],
        AI_PERSONALITIES.SUPPORTIVE_MENTOR,
        CLAUDE_MODELS.CLAUDE_3_HAIKU
      );
      
      const parsedFeedback = JSON.parse(feedbackResponse);
      setFeedback(parsedFeedback);
      
    } catch (error) {
      console.error("Error generating feedback:", error);
      toast({
        title: "Error",
        description: "Failed to generate interview feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Generating Your Interview Feedback</CardTitle>
          <CardDescription>Analyzing your responses and preparing detailed feedback...</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-8">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <Progress value={65} className="w-full max-w-md mb-4" />
          <p className="text-muted-foreground text-center max-w-md">
            Our AI coach is analyzing your interview performance and preparing actionable feedback to help you improve.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  if (!feedback) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Feedback Error</CardTitle>
          <CardDescription>Unable to generate feedback</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-8">
          <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
          <p className="text-muted-foreground text-center mb-4">
            There was an error generating your interview feedback. Please try again.
          </p>
          <Button onClick={generateFeedback}>Retry</Button>
        </CardContent>
      </Card>
    );
  }
  
  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-amber-600";
    return "text-red-600";
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Interview Feedback</CardTitle>
            <CardDescription>{interview.title}</CardDescription>
          </div>
          <div className="flex flex-col items-center">
            <div className={`text-3xl font-bold ${getScoreColor(feedback.overallScore)}`}>
              {feedback.overallScore}/10
            </div>
            <p className="text-xs text-muted-foreground">Overall Score</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-muted p-4 rounded-md">
          <h3 className="font-medium mb-2">Summary</h3>
          <p>{feedback.summary}</p>
        </div>
        
        <Tabs defaultValue="strengths">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="strengths">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Strengths
            </TabsTrigger>
            <TabsTrigger value="improvements">
              <LineChart className="w-4 h-4 mr-2" />
              Areas for Improvement
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="strengths" className="space-y-4 pt-4">
            <ul className="space-y-2">
              {feedback.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="improvements" className="space-y-4 pt-4">
            <ul className="space-y-2">
              {feedback.areasForImprovement.map((area, index) => (
                <li key={index} className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mr-2 mt-0.5 shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-4">Question-Specific Feedback</h3>
          <div className="space-y-4">
            {feedback.questionFeedback.map((qf, index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{qf.question}</h4>
                  <Badge className={getScoreColor(qf.score)}>
                    Score: {qf.score}/10
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{qf.feedback}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-4">Recommended Resources</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {feedback.recommendedResources.map((resource, index) => (
              <Card key={index} className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-2">
                    {resource.type === "article" && <FileText className="w-5 h-5 text-blue-500 shrink-0" />}
                    {resource.type === "video" && <Video className="w-5 h-5 text-red-500 shrink-0" />}
                    {resource.type === "course" && <BookOpen className="w-5 h-5 text-green-500 shrink-0" />}
                    {resource.type === "book" && <BookOpen className="w-5 h-5 text-amber-500 shrink-0" />}
                    <div>
                      <h4 className="font-medium text-sm">{resource.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-3">Action Plan</h3>
          <ul className="space-y-2">
            {feedback.actionPlan.map((action, index) => (
              <li key={index} className="flex items-start pl-1">
                <span className="font-medium text-primary mr-2">{index + 1}.</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter className="justify-between">
        <Button variant="outline" onClick={onBack}>
          Back to Interview
        </Button>
        <Button onClick={() => onSubmit(feedback)}>
          Save Feedback & Finish
        </Button>
      </CardFooter>
    </Card>
  );
}
