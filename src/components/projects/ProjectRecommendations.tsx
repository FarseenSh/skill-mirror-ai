
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Project, ProjectSkill } from "@/types/project";
import { findSkillGaps, recommendProjectsForSkillGaps } from "@/lib/projectSkillIntegration";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Award, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { projectsManager } from "@/lib/supabase";

// Mock data for target role skills - in a real app, this would come from a selected career path
const MOCK_TARGET_ROLE_SKILLS = [
  { name: "JavaScript", required: 80 },
  { name: "React", required: 75 },
  { name: "TypeScript", required: 70 },
  { name: "SQL", required: 65 },
  { name: "Communication", required: 80 },
  { name: "Problem Solving", required: 85 }
];

export function ProjectRecommendations() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [skillGaps, setSkillGaps] = useState<{ skill: string; current: number; target: number; gap: number }[]>([]);
  const [recommendedProjects, setRecommendedProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadRecommendations = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Find skill gaps based on target role
        const gaps = await findSkillGaps(user.id, MOCK_TARGET_ROLE_SKILLS);
        setSkillGaps(gaps.filter(gap => gap.gap > 0));
        
        // Get project recommendations
        const recommendations = await recommendProjectsForSkillGaps(user.id, gaps);
        setRecommendedProjects(recommendations.slice(0, 3)); // Show top 3 recommendations
      } catch (error) {
        console.error("Error loading recommendations:", error);
        toast({
          title: "Error loading recommendations",
          description: "Failed to load project recommendations",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadRecommendations();
  }, [user]);

  const handleAcceptProject = async (projectId: string) => {
    if (!user) return;
    
    try {
      await projectsManager.acceptProject(projectId, user.id);
      
      toast({
        title: "Project accepted",
        description: "The project has been added to your board",
      });
      
      // Update the list
      setRecommendedProjects(prev => prev.filter(p => p.id !== projectId));
    } catch (error) {
      console.error("Error accepting project:", error);
      toast({
        title: "Error accepting project",
        description: "Failed to accept the project",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 mr-2 text-primary" />
          Skill-Based Project Recommendations
        </CardTitle>
        <CardDescription>
          Projects that will help you close skill gaps for your target career path
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : skillGaps.length === 0 ? (
          <div className="text-center py-6">
            <Award className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-2 text-lg font-medium">No skill gaps detected!</h3>
            <p className="text-muted-foreground mt-1">
              You're on track with your current skill levels for your target role.
            </p>
          </div>
        ) : recommendedProjects.length === 0 ? (
          <div className="text-center py-6">
            <div className="rounded-full bg-muted p-3 w-12 h-12 mx-auto flex items-center justify-center">
              <Target className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-2 text-lg font-medium">No recommendations available</h3>
            <p className="text-muted-foreground mt-1">
              We don't have projects that match your current skill gaps.
            </p>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Your current skill gaps:</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {skillGaps.map(gap => (
                  <Badge key={gap.skill} variant="outline">
                    {gap.skill}: {gap.gap} points
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm font-medium">Top skill gaps:</span>
              {skillGaps.slice(0, 3).map(gap => (
                <Badge key={gap.skill} variant="secondary">
                  {gap.skill}: {gap.current}/{gap.target}
                </Badge>
              ))}
            </div>
            
            <div className="space-y-3">
              {recommendedProjects.map(project => (
                <div key={project.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{project.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {project.description || "No description available"}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {project.priority} priority
                        </Badge>
                        {project.deadline && (
                          <Badge variant="outline" className="text-xs">
                            Due: {new Date(project.deadline).toLocaleDateString()}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      onClick={() => handleAcceptProject(project.id)}
                    >
                      Accept
                    </Button>
                  </div>
                  
                  <div className="mt-3">
                    <h4 className="text-xs font-medium mb-1">Skills you'll improve:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.skills && project.skills.map(skill => {
                        const matchingGap = skillGaps.find(
                          gap => gap.skill.toLowerCase() === skill.skill_name.toLowerCase()
                        );
                        
                        return (
                          <Badge 
                            key={skill.id} 
                            className={matchingGap ? "bg-primary/20 text-primary" : ""}
                          >
                            {skill.skill_name} (Level {skill.skill_level})
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end mt-6">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => navigate('/app/projects')}
                className="flex items-center"
              >
                View all projects
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
