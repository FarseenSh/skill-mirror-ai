
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Project } from "@/types/project";
import { getPortfolioProjects } from "@/lib/projectSkillIntegration";
import { projectSubmissionsManager } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, Code, ExternalLink, Eye, FileText, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function PortfolioProjects() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [portfolioProjects, setPortfolioProjects] = useState<Project[]>([]);
  const [projectSubmissions, setProjectSubmissions] = useState<Record<string, any[]>>({});
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const loadPortfolioProjects = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Get portfolio-visible projects
        const projects = await getPortfolioProjects(user.id);
        setPortfolioProjects(projects);
        
        // Load submissions for each project
        const submissionsMap: Record<string, any[]> = {};
        await Promise.all(
          projects.map(async project => {
            const submissions = await projectSubmissionsManager.getProjectSubmissions(project.id);
            if (submissions.length > 0) {
              submissionsMap[project.id] = submissions;
            }
          })
        );
        
        setProjectSubmissions(submissionsMap);
      } catch (error) {
        console.error("Error loading portfolio projects:", error);
        toast({
          title: "Error loading portfolio",
          description: "Failed to load portfolio projects",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadPortfolioProjects();
  }, [user]);

  const getSubmissionIcon = (type: string) => {
    switch (type) {
      case 'code':
        return <Code className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'link':
        return <Link className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-primary" />
          Portfolio Projects
        </CardTitle>
        <CardDescription>
          Completed projects that showcase your skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : portfolioProjects.length === 0 ? (
          <div className="text-center py-6">
            <div className="rounded-full bg-muted p-3 w-12 h-12 mx-auto flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-2 text-lg font-medium">No portfolio projects yet</h3>
            <p className="text-muted-foreground mt-1">
              Complete projects and mark them as "Show in Portfolio" to build your professional showcase.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {portfolioProjects.map(project => (
              <div key={project.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-2">
                      {project.description || "No description available"}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      <Badge variant="secondary">
                        Completed on {new Date(project.updated_at).toLocaleDateString()}
                      </Badge>
                      
                      {project.feedback && (
                        <Badge variant="outline" className="bg-green-50">
                          With feedback
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedProject(project)}
                      >
                        <Eye className="mr-1 h-4 w-4" />
                        Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{project.title}</DialogTitle>
                        <DialogDescription>
                          Portfolio preview - how others will see your project
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Description</h4>
                          <p className="text-sm">
                            {project.description || "No description available"}
                          </p>
                        </div>
                        
                        {project.feedback && (
                          <div>
                            <h4 className="text-sm font-medium mb-1">Feedback</h4>
                            <div className="bg-muted p-3 rounded text-sm">
                              {project.feedback}
                            </div>
                          </div>
                        )}
                        
                        {projectSubmissions[project.id] && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Work Samples</h4>
                            <div className="space-y-2">
                              {projectSubmissions[project.id].map(submission => (
                                <div key={submission.id} className="border rounded p-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    {getSubmissionIcon(submission.submission_type)}
                                    <span className="text-sm font-medium">
                                      {submission.submission_type.charAt(0).toUpperCase() + 
                                        submission.submission_type.slice(1)} Submission
                                    </span>
                                    <span className="text-xs text-muted-foreground ml-auto">
                                      {new Date(submission.submitted_at).toLocaleDateString()}
                                    </span>
                                  </div>
                                  
                                  <div className="bg-muted p-2 rounded text-sm font-mono overflow-auto max-h-32">
                                    {submission.content}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="mr-1 h-4 w-4" />
                          Open Full Portfolio
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {projectSubmissions[project.id] && (
                  <div className="mt-3">
                    <h4 className="text-xs font-medium mb-1">Submissions:</h4>
                    <div className="flex gap-2">
                      {projectSubmissions[project.id].slice(0, 3).map(submission => (
                        <Badge key={submission.id} variant="outline" className="flex items-center">
                          {getSubmissionIcon(submission.submission_type)}
                          <span className="ml-1">{submission.submission_type}</span>
                        </Badge>
                      ))}
                      {projectSubmissions[project.id].length > 3 && (
                        <Badge variant="outline">
                          +{projectSubmissions[project.id].length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
