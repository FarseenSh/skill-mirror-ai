import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { projectsManager, projectSkillsManager, projectSubtasksManager, projectSubmissionsManager } from "@/lib/supabase";
import { Project, ProjectSkill, ProjectSubtask, ProjectSubmission } from "@/types/project";
import { useToast } from "@/hooks/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  BarChart3,
  ArrowLeft,
  User,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { ProjectCompletionActions } from "@/components/projects/ProjectCompletionActions";

export default function ProjectDetailsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [project, setProject] = useState<Project | null>(null);
  const [skills, setSkills] = useState<ProjectSkill[]>([]);
  const [subtasks, setSubtasks] = useState<ProjectSubtask[]>([]);
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [submissionContent, setSubmissionContent] = useState("");
  const [submissionType, setSubmissionType] = useState<"code" | "document" | "link" | "other">("code");
  
  const loadProjectData = async () => {
    if (!projectId || !user) return;
    
    try {
      setLoading(true);
      
      const projectData = await projectsManager.getProjectById(projectId);
      const typedProject: Project = {
        ...projectData,
        status: projectData.status as 'pending' | 'in_progress' | 'completed' | 'blocked',
        project_type: projectData.project_type as 'assigned' | 'recommended' | 'personal',
        priority: projectData.priority as 'low' | 'medium' | 'high'
      };
      setProject(typedProject);
      
      const skillsData = await projectSkillsManager.getProjectSkills(projectId);
      setSkills(skillsData as ProjectSkill[]);
      
      const subtasksData = await projectSubtasksManager.getProjectSubtasks(projectId);
      const typedSubtasks: ProjectSubtask[] = subtasksData.map(subtask => ({
        ...subtask,
        status: subtask.status as 'pending' | 'in_progress' | 'completed' | 'blocked'
      }));
      setSubtasks(typedSubtasks);
      
      const submissionsData = await projectSubmissionsManager.getProjectSubmissions(projectId);
      const typedSubmissions: ProjectSubmission[] = submissionsData.map(submission => ({
        ...submission,
        submission_type: submission.submission_type as 'code' | 'document' | 'link' | 'other'
      }));
      setSubmissions(typedSubmissions);
    } catch (err: any) {
      console.error("Error loading project data:", err);
      toast({
        title: "Error loading project",
        description: err.message || "Failed to load project details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadProjectData();
  }, [projectId, user]);
  
  const handleSubmitWork = async () => {
    if (!projectId || !user || !submissionContent.trim()) return;
    
    try {
      await projectSubmissionsManager.addSubmission({
        project_id: projectId,
        user_id: user.id,
        content: submissionContent,
        submission_type: submissionType,
      });
      
      if (project?.status === 'pending') {
        await projectsManager.updateProjectStatus(projectId, 'in_progress');
        setProject(prev => prev ? { ...prev, status: 'in_progress' as const } : null);
      }
      
      const submissionsData = await projectSubmissionsManager.getProjectSubmissions(projectId);
      const typedSubmissions: ProjectSubmission[] = submissionsData.map(submission => ({
        ...submission,
        submission_type: submission.submission_type as 'code' | 'document' | 'link' | 'other'
      }));
      setSubmissions(typedSubmissions);
      
      setSubmissionContent("");
      
      toast({
        title: "Work submitted",
        description: "Your submission has been recorded successfully",
      });
    } catch (err: any) {
      console.error("Error submitting work:", err);
      toast({
        title: "Error submitting work",
        description: err.message || "Failed to submit your work",
        variant: "destructive"
      });
    }
  };
  
  const handleUpdateSubtaskStatus = async (subtaskId: string, status: 'pending' | 'in_progress' | 'completed' | 'blocked') => {
    try {
      await projectSubtasksManager.updateSubtaskStatus(subtaskId, status);
      
      const subtasksData = await projectSubtasksManager.getProjectSubtasks(projectId!);
      const typedSubtasks: ProjectSubtask[] = subtasksData.map(subtask => ({
        ...subtask,
        status: subtask.status as 'pending' | 'in_progress' | 'completed' | 'blocked'
      }));
      setSubtasks(typedSubtasks);
      
      if (typedSubtasks.length > 0) {
        const completedCount = typedSubtasks.filter(st => st.status === 'completed').length;
        const progress = Math.round((completedCount / typedSubtasks.length) * 100);
        
        await projectsManager.updateProjectProgress(projectId!, progress);
        setProject(prev => prev ? { ...prev, progress } : null);
      }
      
      toast({
        title: "Subtask updated",
        description: `Subtask status changed to ${status}`,
      });
    } catch (err: any) {
      console.error("Error updating subtask:", err);
      toast({
        title: "Error updating subtask",
        description: err.message || "Failed to update the subtask",
        variant: "destructive"
      });
    }
  };
  
  const handleMarkProjectComplete = async () => {
    await loadProjectData();
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'in_progress':
        return <BarChart3 className="h-4 w-4 mr-1" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case 'blocked':
        return <AlertTriangle className="h-4 w-4 mr-1" />;
      default:
        return <Clock className="h-4 w-4 mr-1" />;
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-slate-100 text-slate-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'high':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <Card className="my-8">
        <CardContent className="py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The project you are looking for does not exist or you don't have permission to view it.
            </p>
            <Button onClick={() => navigate('/app/projects')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/app/projects')}
            className="mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge className={getStatusColor(project.status)}>
              {getStatusIcon(project.status)}
              {project.status}
            </Badge>
            <Badge className={getPriorityColor(project.priority)}>
              {project.priority} priority
            </Badge>
            {project.deadline && (
              <Badge variant="outline">
                <Calendar className="h-4 w-4 mr-1" />
                Due: {format(new Date(project.deadline), "MMM d, yyyy")}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {project.assigned_to === user?.id && (
            <ProjectCompletionActions 
              project={project}
              onProjectComplete={handleMarkProjectComplete}
            />
          )}
          {project.user_id === user?.id && (
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </Button>
          )}
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Project Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{project.progress}% Complete</span>
              <span>
                {subtasks.filter(s => s.status === 'completed').length}/{subtasks.length} tasks completed
              </span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-4 md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subtasks">Tasks</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              {project.description ? (
                <div className="prose">
                  <p>{project.description}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">No description available.</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="divide-y divide-border">
                <div className="grid grid-cols-1 sm:grid-cols-3 py-3">
                  <dt className="text-sm font-medium text-muted-foreground sm:col-span-1">Project Type</dt>
                  <dd className="text-sm sm:col-span-2">{project.project_type}</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-3">
                  <dt className="text-sm font-medium text-muted-foreground sm:col-span-1">Created</dt>
                  <dd className="text-sm sm:col-span-2">{format(new Date(project.created_at), "MMMM d, yyyy")}</dd>
                </div>
                {project.deadline && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 py-3">
                    <dt className="text-sm font-medium text-muted-foreground sm:col-span-1">Deadline</dt>
                    <dd className="text-sm sm:col-span-2">{format(new Date(project.deadline), "MMMM d, yyyy")}</dd>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-3 py-3">
                  <dt className="text-sm font-medium text-muted-foreground sm:col-span-1">Assigned To</dt>
                  <dd className="text-sm sm:col-span-2">{project.assigned_to === user?.id ? 'You' : 'Other User'}</dd>
                </div>
                {project.feedback && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 py-3">
                    <dt className="text-sm font-medium text-muted-foreground sm:col-span-1">Feedback</dt>
                    <dd className="text-sm sm:col-span-2">{project.feedback}</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subtasks" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>Tasks that need to be completed for this project.</CardDescription>
              </div>
              {project.user_id === user?.id && (
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {subtasks.length > 0 ? (
                <div className="divide-y divide-border">
                  {subtasks.map((subtask) => (
                    <div key={subtask.id} className="py-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{subtask.title}</h4>
                          {subtask.description && (
                            <p className="text-sm text-muted-foreground mt-1">{subtask.description}</p>
                          )}
                          {subtask.due_date && (
                            <div className="flex items-center text-xs text-muted-foreground mt-2">
                              <Calendar className="h-3 w-3 mr-1" />
                              Due: {format(new Date(subtask.due_date), "MMM d, yyyy")}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center">
                          <Badge className={getStatusColor(subtask.status)}>
                            {subtask.status}
                          </Badge>
                          {project.assigned_to === user?.id && (
                            <div className="ml-4 flex">
                              {subtask.status !== 'completed' ? (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleUpdateSubtaskStatus(subtask.id, 'completed')}
                                >
                                  Complete
                                </Button>
                              ) : (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleUpdateSubtaskStatus(subtask.id, 'in_progress')}
                                >
                                  Reopen
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No tasks have been added to this project yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="submissions" className="space-y-6 mt-6">
          {project.assigned_to === user?.id && project.status !== 'completed' && (
            <Card>
              <CardHeader>
                <CardTitle>Submit Work</CardTitle>
                <CardDescription>
                  Share your progress or final deliverable for this project.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Enter code, link, or text content for your submission..."
                    value={submissionContent}
                    onChange={(e) => setSubmissionContent(e.target.value)}
                    className="min-h-[150px]"
                  />
                  <Button 
                    onClick={handleSubmitWork}
                    disabled={!submissionContent.trim()}
                  >
                    Submit Work
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Submission History</CardTitle>
              <CardDescription>
                Previous submissions for this project.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submissions.length > 0 ? (
                <div className="divide-y divide-border">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">
                              {submission.submission_type}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {format(new Date(submission.submitted_at), "MMM d, yyyy - h:mm a")}
                            </span>
                          </div>
                          <div className="bg-muted rounded p-3 text-sm font-mono overflow-auto">
                            {submission.content}
                          </div>
                          {submission.feedback && (
                            <div className="mt-3 pl-3 border-l-2 border-primary">
                              <h5 className="text-sm font-medium mb-1">Feedback:</h5>
                              <p className="text-sm">{submission.feedback}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No submissions have been made for this project yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="skills" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
              <CardDescription>
                Skills you'll develop by completing this project.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {skills.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">{skill.skill_name}</h4>
                      <div className="flex items-center">
                        <div className="flex-1 mr-4">
                          <Progress value={skill.skill_level} className="h-2" />
                        </div>
                        <span className="text-sm">Level {skill.skill_level}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No skills have been associated with this project yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
