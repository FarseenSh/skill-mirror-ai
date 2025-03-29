
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { Project } from "@/types/project";
import { useAuth } from "@/components/AuthProvider";
import { projectsManager } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, RefreshCw } from "lucide-react";

export default function ProjectsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadProjects = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Load both created and assigned projects
      const createdProjects = await projectsManager.getUserProjects(user.id);
      
      // Load assigned projects if there's a user
      const assignedProjects = await projectsManager.getAssignedProjects(user.id);
      
      // Combine and deduplicate projects (in case of overlap)
      const allProjects = [...createdProjects];
      assignedProjects.forEach(assignedProject => {
        if (!allProjects.some(p => p.id === assignedProject.id)) {
          allProjects.push(assignedProject);
        }
      });
      
      // Type assertion to ensure proper types
      const typedProjects: Project[] = allProjects.map(project => ({
        ...project,
        status: project.status as 'pending' | 'in_progress' | 'completed' | 'blocked',
        project_type: project.project_type as 'assigned' | 'recommended' | 'personal',
        priority: project.priority as 'low' | 'medium' | 'high'
      }));
      
      setProjects(typedProjects);
    } catch (err: any) {
      console.error("Error loading projects:", err);
      setError(err);
      toast({
        title: "Error loading projects",
        description: err.message || "Failed to load your projects",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects Board</h1>
          <p className="text-muted-foreground">
            Manage your assignments and track project progress.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadProjects}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            New Project
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
          <CardDescription>
            View and manage all your projects in one place.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectsList 
            projects={projects} 
            isLoading={isLoading} 
            error={error}
          />
        </CardContent>
      </Card>
    </div>
  );
}
