
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Trophy } from "lucide-react";
import { Project } from "@/types/project";
import { Skill } from "@/data/skillsData";
import { updateSkillsFromCompletedProject } from "@/lib/projectSkillIntegration";
import { projectsManager } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface ProjectCompletionActionsProps {
  project: Project;
  onProjectComplete: () => void;
}

export function ProjectCompletionActions({ project, onProjectComplete }: ProjectCompletionActionsProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [addToPortfolio, setAddToPortfolio] = useState(project.portfolio_visible);
  const [processing, setProcessing] = useState(false);
  const [skillsUpdated, setSkillsUpdated] = useState<Skill[]>([]);
  const [showSkillUpdates, setShowSkillUpdates] = useState(false);

  const handleMarkProjectComplete = async () => {
    if (!user || !project.id) return;
    
    try {
      setProcessing(true);
      
      // Mark project as complete
      await projectsManager.updateProjectStatus(project.id, 'completed');
      await projectsManager.updateProjectProgress(project.id, 100);
      
      // Update portfolio visibility
      await projectsManager.updateProject(project.id, {
        portfolio_visible: addToPortfolio
      });
      
      // Update skills based on project completion
      const updatedSkills = await updateSkillsFromCompletedProject(user.id, project.id);
      setSkillsUpdated(updatedSkills);
      
      if (updatedSkills.length > 0) {
        setShowSkillUpdates(true);
      }
      
      toast({
        title: "Project completed",
        description: "Congratulations on completing this project!",
      });
      
      // Call parent update handler
      onProjectComplete();
    } catch (err: any) {
      console.error("Error completing project:", err);
      toast({
        title: "Error completing project",
        description: err.message || "Failed to mark project as complete",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  if (project.status === 'completed') {
    return (
      <div className="flex items-center space-x-2 text-green-600">
        <CheckCircle2 className="h-5 w-5" />
        <span className="font-medium">Project Completed</span>
      </div>
    );
  }

  return (
    <div>
      {showSkillUpdates ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <Trophy className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-800">Skills updated!</h3>
              <p className="text-sm text-green-700 mb-2">
                You've improved the following skills by completing this project:
              </p>
              <div className="space-y-2">
                {skillsUpdated.map(skill => (
                  <div key={skill.id} className="bg-white rounded p-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-green-600">
                        Proficiency: {skill.proficiency}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3"
                onClick={() => setShowSkillUpdates(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="add-to-portfolio"
              checked={addToPortfolio}
              onCheckedChange={setAddToPortfolio}
            />
            <Label htmlFor="add-to-portfolio">Show in portfolio</Label>
          </div>
          
          <Button 
            onClick={handleMarkProjectComplete}
            disabled={processing}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {processing ? "Processing..." : "Mark Complete"}
          </Button>
        </div>
      )}
    </div>
  );
}
