
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { getPortfolioProjects } from "@/lib/projectSkillIntegration";
import { Project } from "@/types/project";
import { projectSkillsManager, projectSubmissionsManager, userProfiles } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowUpRight, 
  Briefcase, 
  Code, 
  FileText, 
  Github, 
  Globe, 
  LinkIcon,
  Award,
  User,
  Calendar
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

export default function PortfolioPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [portfolioProjects, setPortfolioProjects] = useState<Project[]>([]);
  const [projectSkills, setProjectSkills] = useState<Record<string, any[]>>({});
  const [projectSubmissions, setProjectSubmissions] = useState<Record<string, any[]>>({});
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const loadPortfolioData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Load user profile
        const profile = await userProfiles.getProfile(user.id);
        setUserProfile(profile);
        
        // Load portfolio projects
        const projects = await getPortfolioProjects(user.id);
        setPortfolioProjects(projects);
        
        // Load skills and submissions for each project
        const skillsMap: Record<string, any[]> = {};
        const submissionsMap: Record<string, any[]> = {};
        
        await Promise.all(
          projects.map(async project => {
            const skills = await projectSkillsManager.getProjectSkills(project.id);
            skillsMap[project.id] = skills;
            
            const submissions = await projectSubmissionsManager.getProjectSubmissions(project.id);
            submissionsMap[project.id] = submissions;
          })
        );
        
        setProjectSkills(skillsMap);
        setProjectSubmissions(submissionsMap);
      } catch (error) {
        console.error("Error loading portfolio data:", error);
        toast({
          title: "Error loading portfolio",
          description: "Failed to load your portfolio data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadPortfolioData();
  }, [user]);

  const getSubmissionIcon = (type: string) => {
    switch (type) {
      case 'code':
        return <Code className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'link':
        return <LinkIcon className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Get all unique skills across projects
  const getAllSkills = () => {
    const allSkills: Record<string, number> = {};
    
    Object.values(projectSkills).forEach(skills => {
      skills.forEach(skill => {
        if (allSkills[skill.skill_name]) {
          allSkills[skill.skill_name] = Math.max(allSkills[skill.skill_name], skill.skill_level);
        } else {
          allSkills[skill.skill_name] = skill.skill_level;
        }
      });
    });
    
    return Object.entries(allSkills)
      .map(([name, level]) => ({ name, level }))
      .sort((a, b) => b.level - a.level);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
        <p className="text-muted-foreground">
          Showcase your skills and completed projects
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 space-y-4">
                  <div className="bg-muted aspect-square rounded-lg flex items-center justify-center">
                    {userProfile?.avatar_url ? (
                      <img 
                        src={userProfile.avatar_url} 
                        alt={userProfile.full_name || "User"}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    ) : (
                      <User className="h-16 w-16 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Globe className="mr-2 h-4 w-4" />
                      Website
                    </Button>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold">
                    {userProfile?.full_name || "Developer"}
                  </h2>
                  <p className="text-muted-foreground">
                    {userProfile?.job_title || "Software Developer"}
                    {userProfile?.company && ` at ${userProfile.company}`}
                  </p>
                  
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Bio</h3>
                    <p className="text-sm">
                      {userProfile?.bio || 
                        "Developer passionate about building amazing applications and continuously improving my skills."}
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Key Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {getAllSkills().slice(0, 10).map(skill => (
                        <Badge key={skill.name} className="px-3 py-1">
                          {skill.name} (Lvl {skill.level})
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-primary" />
                Projects
              </CardTitle>
              <CardDescription>
                Completed projects showcasing your skills and expertise.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {portfolioProjects.length === 0 ? (
                <div className="text-center py-12">
                  <Award className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No portfolio projects yet</h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    Complete projects and mark them as "Show in Portfolio" to showcase your work.
                  </p>
                  <Button size="sm">
                    Go to Projects
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {portfolioProjects.map(project => (
                    <div key={project.id} className="border-b pb-8 last:border-0 last:pb-0">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                        <Badge variant="secondary" className="font-normal">
                          Completed
                        </Badge>
                        <span className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {format(new Date(project.updated_at), "MMMM yyyy")}
                        </span>
                      </div>
                      
                      <p className="mb-4">
                        {project.description || "No description available"}
                      </p>
                      
                      {projectSkills[project.id] && projectSkills[project.id].length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Skills Demonstrated:</h4>
                          <div className="flex flex-wrap gap-2">
                            {projectSkills[project.id].map(skill => (
                              <Badge key={skill.id} variant="outline">
                                {skill.skill_name} (Level {skill.skill_level})
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {projectSubmissions[project.id] && projectSubmissions[project.id].length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">
                            Project Submissions ({projectSubmissions[project.id].length}):
                          </h4>
                          <div className="space-y-3">
                            {projectSubmissions[project.id].slice(0, 1).map(submission => (
                              <div key={submission.id} className="bg-muted rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center">
                                    {getSubmissionIcon(submission.submission_type)}
                                    <span className="ml-2 text-sm font-medium">
                                      {submission.submission_type.charAt(0).toUpperCase() + 
                                        submission.submission_type.slice(1)} Submission
                                    </span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {format(new Date(submission.submitted_at), "MMM d, yyyy")}
                                  </span>
                                </div>
                                
                                <div className="bg-background p-3 rounded text-sm font-mono overflow-auto max-h-32">
                                  {submission.content}
                                </div>
                                
                                {projectSubmissions[project.id].length > 1 && (
                                  <div className="text-center mt-2">
                                    <Button variant="link" size="sm">
                                      View all {projectSubmissions[project.id].length} submissions
                                    </Button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {project.feedback && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Feedback:</h4>
                          <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded text-sm italic">
                            {project.feedback}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getAllSkills().slice(0, 8).map(skill => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span>{skill.name}</span>
                      <span>Level {skill.level}/10</span>
                    </div>
                    <Progress 
                      value={skill.level * 10} 
                      className="h-2"
                    />
                  </div>
                ))}
                
                {getAllSkills().length > 8 && (
                  <Button variant="link" size="sm" className="mt-2 w-full">
                    View all skills
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-muted-foreground w-20">Email:</span>
                  <span>{userProfile?.email || "user@example.com"}</span>
                </div>
                
                <Separator />
                
                <div className="pt-2">
                  <Button className="w-full">
                    Download CV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
