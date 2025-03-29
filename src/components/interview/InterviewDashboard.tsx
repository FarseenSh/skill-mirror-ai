
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Briefcase, Star, Play, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { interviewsManager } from "@/lib/supabase";
import { formatDistanceToNow } from "date-fns";

interface InterviewDashboardProps {
  onStartNewInterview: () => void;
  onContinueInterview: (interview: any) => void;
}

export function InterviewDashboard({ onStartNewInterview, onContinueInterview }: InterviewDashboardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [interviews, setInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch user interviews
  const fetchInterviews = async () => {
    try {
      setIsLoading(true);
      if (user) {
        const userInterviews = await interviewsManager.getUserInterviews(user.id);
        setInterviews(userInterviews);
      }
    } catch (error) {
      console.error("Error fetching interviews:", error);
      toast({
        title: "Error",
        description: "Failed to load interview history.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchInterviews();
  }, [user]);
  
  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="success" className="ml-2">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="secondary" className="ml-2">
            <Play className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="ml-2">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Interview Dashboard</h2>
        <Button onClick={onStartNewInterview} className="mt-4 sm:mt-0">
          Start New Interview
        </Button>
      </div>
      
      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent Interviews</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="progress">In Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="space-y-4">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-4 w-1/4 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                </CardContent>
              </Card>
            ))
          ) : interviews.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center mb-4">
                  You haven't completed any interview practice sessions yet.
                </p>
                <Button onClick={onStartNewInterview}>Start Your First Interview</Button>
              </CardContent>
            </Card>
          ) : (
            interviews.slice(0, 5).map((interview) => (
              <Card key={interview.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{interview.title}</CardTitle>
                    {getStatusBadge(interview.status)}
                  </div>
                  <CardDescription className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDistanceToNow(new Date(interview.created_at), { addSuffix: true })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span>{interview.job_title}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  {interview.status === "in_progress" ? (
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => onContinueInterview(interview)}
                    >
                      Continue Interview
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mr-2"
                    >
                      View Feedback
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          {!isLoading && interviews.filter(i => i.status === "completed").length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  You haven't completed any interviews yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            interviews
              .filter(interview => interview.status === "completed")
              .map((interview) => (
                <Card key={interview.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{interview.title}</CardTitle>
                      {getStatusBadge(interview.status)}
                    </div>
                    <CardDescription className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDistanceToNow(new Date(interview.created_at), { addSuffix: true })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span>{interview.job_title}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">
                      View Feedback
                    </Button>
                  </CardFooter>
                </Card>
              ))
          )}
        </TabsContent>
        
        <TabsContent value="progress" className="space-y-4">
          {!isLoading && interviews.filter(i => i.status === "in_progress").length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Play className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  You don't have any interviews in progress.
                </p>
              </CardContent>
            </Card>
          ) : (
            interviews
              .filter(interview => interview.status === "in_progress")
              .map((interview) => (
                <Card key={interview.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{interview.title}</CardTitle>
                      {getStatusBadge(interview.status)}
                    </div>
                    <CardDescription className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDistanceToNow(new Date(interview.created_at), { addSuffix: true })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span>{interview.job_title}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => onContinueInterview(interview)}
                    >
                      Continue Interview
                    </Button>
                  </CardFooter>
                </Card>
              ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
