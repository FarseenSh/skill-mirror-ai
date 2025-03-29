import React from 'react';
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
  Video,
  TrendingUp,
  BarChart2 
} from "lucide-react";
import { claudeService, CLAUDE_MODELS, AI_PERSONALITIES } from "@/services/claudeService";
import { interviewsManager } from "@/lib/supabase";

interface InterviewFeedbackProps {
  interview: {
    id: string;
    title: string;
    job_title: string;
    interviewer_type: string;
    settings?: Record<string, any>;
    [key: string]: any;
  };
  questions: Array<{
    question: string;
    context?: string;
    keyPoints?: string[];
    exampleStructure?: string;
    relatedQuestions?: string[];
  }>;
  onSubmit: (feedback: any) => void;
  onBack: () => void;
}

export function InterviewFeedback({ interview, questions, onSubmit, onBack }: InterviewFeedbackProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<any>(null);
  const [previousInterviews, setPreviousInterviews] = useState([]);
  const [progressData, setProgressData] = useState<{
    points: Array<{date: string, score: number}>;
    averageScore: number;
    improvementRate: number;
  } | null>(null);
  
  useEffect(() => {
    generateFeedback();
    fetchPreviousInterviews();
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
              "description": "brief description",
              "url": "optional url"
            },
            ...
          ],
          "actionPlan": [
            "action item 1",
            "action item 2",
            ...
          ],
          "skillsAssessment": {
            "technical": number,  // 1-10 rating if technical interview
            "communication": number, // 1-10 rating
            "problemSolving": number, // 1-10 rating
            "behavioralAwareness": number // 1-10 rating if behavioral interview
          }
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
  
  const fetchPreviousInterviews = async () => {
    try {
      if (interview && interview.user_id) {
        // Get previous completed interviews for the same job type
        const previousInterviews = await interviewsManager.getUserInterviews(interview.user_id, "completed");
        
        // Filter to only interviews with the same interview type
        const similarInterviews = previousInterviews.filter(prev => 
          prev.id !== interview.id && 
          prev.title.split(" - ")[1] === interview.title.split(" - ")[1]
        );
        
        setPreviousInterviews(similarInterviews);
        
        if (similarInterviews.length > 0) {
          analyzeProgress(similarInterviews);
        }
      }
    } catch (error) {
      console.error("Error fetching previous interviews:", error);
    }
  };
  
  const analyzeProgress = async (previousInterviews) => {
    try {
      // Sort by creation date
      const sortedInterviews = [...previousInterviews].sort((a, b) => 
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      
      // Extract scores from each interview feedback
      const progressPoints = sortedInterviews.map(interview => {
        try {
          const feedback = JSON.parse(interview.feedback || '{}');
          return {
            date: new Date(interview.created_at).toLocaleDateString(),
            score: feedback.overallScore || 0
          };
        } catch (e) {
          return null;
        }
      }).filter(point => point !== null);
      
      // Only proceed if we have data points
      if (progressPoints.length > 0) {
        setProgressData({
          points: progressPoints,
          averageScore: progressPoints.reduce((sum, point) => sum + point.score, 0) / progressPoints.length,
          improvementRate: progressPoints.length > 1 ? 
            ((progressPoints[progressPoints.length - 1].score - progressPoints[0].score) / progressPoints[0].score) * 100 : 0
        });
      }
    } catch (error) {
      console.error("Error analyzing progress:", error);
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
  
  const getScoreColor = (score: number) => {
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="strengths">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Strengths
            </TabsTrigger>
            <TabsTrigger value="improvements">
              <LineChart className="w-4 h-4 mr-2" />
              Areas for Improvement
            </TabsTrigger>
            <TabsTrigger value="progress">
              <TrendingUp className="w-4 h-4 mr-2" />
              Your Progress
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="strengths" className="space-y-4 pt-4">
            <ul className="space-y-2">
              {feedback.strengths.map((strength: string, index: number) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
            
            {feedback.skillsAssessment && (
              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Skills Assessment</h3>
                <div className="grid gap-3">
                  {Object.entries(feedback.skillsAssessment).map(([skill, score]) => (
                    <div key={skill} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{skill}</span>
                        <span className={getScoreColor(score as number)}>{String(score)}/10</span>
                      </div>
                      <Progress value={(score as number) * 10} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="improvements" className="space-y-4 pt-4">
            <ul className="space-y-2">
              {feedback.areasForImprovement.map((area: string, index: number) => (
                <li key={index} className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mr-2 mt-0.5 shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-4 pt-4">
            {progressData ? (
              <div className="space-y-4">
                <div className="bg-card border rounded-md p-4 grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-sm text-muted-foreground">Average Score</p>
                    <p className="text-2xl font-bold">{progressData.averageScore.toFixed(1)}/10</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-sm text-muted-foreground">Improvement</p>
                    <p className={`text-2xl font-bold ${progressData.improvementRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {progressData.improvementRate > 0 ? '+' : ''}{progressData.improvementRate.toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <h4 className="font-medium">Interview Score History</h4>
                <div className="h-48 border rounded-md p-4">
                  <div className="flex h-full items-end">
                    {progressData.points.map((point, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div 
                          className="bg-primary w-full max-w-[30px] rounded-t-sm" 
                          style={{ height: `${point.score * 10}%` }} 
                        ></div>
                        <span className="text-xs mt-2 -rotate-45 origin-top-left">{point.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <BarChart2 className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center mb-2">
                  No previous interview data available for tracking progress.
                </p>
                <p className="text-xs text-muted-foreground text-center">
                  Complete more interviews to see your improvement over time.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-4">Question-Specific Feedback</h3>
          <div className="space-y-4">
            {feedback.questionFeedback.map((qf: any, index: number) => (
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
            {feedback.recommendedResources.map((resource: any, index: number) => (
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
                      {resource.url && (
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-xs text-primary hover:underline mt-1 inline-block"
                        >
                          Visit Resource
                        </a>
                      )}
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
            {feedback.actionPlan.map((action: string, index: number) => (
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
