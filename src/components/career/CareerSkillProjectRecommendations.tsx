
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, BookOpen, HelpCircle, Zap } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { estimateCareerTimeline } from "@/lib/projectSkillIntegration";
import { skillsManager } from "@/lib/supabase";
import { Skill } from "@/data/skillsData";

interface CareerSkillProjectRecommendationsProps {
  targetRole: {
    name: string;
    requiredSkills: { name: string; level: number }[];
  };
}

export function CareerSkillProjectRecommendations({ targetRole }: CareerSkillProjectRecommendationsProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userSkills, setUserSkills] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<{
    monthsToTarget: number;
    completionPercentage: number;
    nextMilestone: string;
  } | null>(null);

  useEffect(() => {
    const loadUserSkills = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Load user skills
        const dbSkills = await skillsManager.getUserSkills(user.id);
        
        // Map database skills to the Skill type format
        const mappedSkills = dbSkills.map(skill => ({
          id: skill.id,
          name: skill.name,
          category: skill.category,
          proficiency: skill.proficiency,
          targetProficiency: skill.target_proficiency,
          // Additional properties for the Skill type
          recentImprovement: false
        }));
        
        setUserSkills(mappedSkills);
        
        // Calculate timeline based on skills
        const timelineEstimate = estimateCareerTimeline(targetRole, mappedSkills);
        setTimeline(timelineEstimate);
      } catch (error) {
        console.error("Error loading skills:", error);
        toast({
          title: "Error loading skills",
          description: "Failed to load your skills data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadUserSkills();
  }, [user, targetRole]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="h-5 w-5 mr-2 text-primary" />
          Your Progress Toward {targetRole.name}
        </CardTitle>
        <CardDescription>
          Track your skill development for this career path
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : !timeline ? (
          <div className="text-center py-4">
            <HelpCircle className="h-8 w-8 mx-auto text-muted-foreground" />
            <p className="mt-2">Could not calculate progress timeline</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-muted-foreground">Path completion</span>
                <div className="text-2xl font-bold">
                  {Math.round(timeline.completionPercentage)}%
                </div>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Estimated time to target</span>
                <div className="text-2xl font-bold">
                  {timeline.monthsToTarget} {timeline.monthsToTarget === 1 ? 'month' : 'months'}
                </div>
              </div>
            </div>
            
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary text-primary-foreground">
                    Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block">
                    {Math.round(timeline.completionPercentage)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/20">
                <div
                  style={{ width: `${timeline.completionPercentage}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                ></div>
              </div>
            </div>
            
            <div className="bg-muted p-3 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Next milestone:</h4>
              <p className="text-sm">{timeline.nextMilestone}</p>
            </div>
            
            <div className="pt-2">
              <h4 className="font-medium text-sm mb-2">Required skills:</h4>
              <div className="space-y-2">
                {targetRole.requiredSkills.map(skill => {
                  const userSkill = userSkills.find(
                    s => s.name.toLowerCase() === skill.name.toLowerCase()
                  );
                  const userLevel = userSkill ? userSkill.proficiency : 0;
                  const percentage = Math.min(100, (userLevel / skill.level) * 100);
                  
                  return (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span>{skill.name}</span>
                        <span>{userLevel}/{skill.level}</span>
                      </div>
                      <div className="w-full bg-primary/20 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="pt-4 flex flex-col gap-2">
              <Button size="sm" className="w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                Recommended Learning
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                View Matching Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
