
import { format, isAfter } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
  onViewDetails?: (projectId: string) => void;
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const isOverdue = project.deadline && isAfter(new Date(), new Date(project.deadline));
  
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

  const getProjectTypeColor = (type: string) => {
    switch (type) {
      case 'assigned':
        return 'bg-indigo-100 text-indigo-800';
      case 'recommended':
        return 'bg-purple-100 text-purple-800';
      case 'personal':
        return 'bg-teal-100 text-teal-800';
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

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{project.title}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge variant="secondary" className={getStatusColor(project.status)}>
                <span className="flex items-center">
                  {getStatusIcon(project.status)}
                  {project.status}
                </span>
              </Badge>
              <Badge variant="secondary" className={getPriorityColor(project.priority)}>
                {project.priority} priority
              </Badge>
              <Badge variant="secondary" className={getProjectTypeColor(project.project_type)}>
                {project.project_type}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        {project.description && (
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {project.description}
          </p>
        )}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
          {project.deadline && (
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className={isOverdue ? "text-red-500" : "text-muted-foreground"}>
                Due: {format(new Date(project.deadline), "MMM d, yyyy")}
                {isOverdue && " (overdue)"}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="default" 
          size="sm" 
          className="w-full"
          onClick={() => onViewDetails && onViewDetails(project.id)}
          asChild
        >
          <Link to={`/app/projects/${project.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
