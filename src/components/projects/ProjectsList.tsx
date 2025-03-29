
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface ProjectsListProps {
  projects: Project[];
  isLoading: boolean;
  error: Error | null;
  onViewDetails?: (projectId: string) => void;
}

export function ProjectsList({ projects, isLoading, error, onViewDetails }: ProjectsListProps) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    let result = [...projects];
    
    // Search filter
    if (searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Status filter
    if (statusFilter !== "all") {
      result = result.filter(p => p.status === statusFilter);
    }
    
    // Priority filter
    if (priorityFilter !== "all") {
      result = result.filter(p => p.priority === priorityFilter);
    }
    
    // Tab filter (project type)
    if (activeTab !== "all") {
      result = result.filter(p => {
        if (activeTab === "in_progress") return p.status === "in_progress";
        if (activeTab === "completed") return p.status === "completed";
        return p.project_type === activeTab;
      });
    }
    
    setFilteredProjects(result);
  }, [projects, searchQuery, statusFilter, priorityFilter, activeTab]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertDescription>
          Error loading projects: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="sm:max-w-xs"
        />
        <div className="flex flex-1 gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-5 h-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="personal">Personal</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No projects found matching the current filters.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
