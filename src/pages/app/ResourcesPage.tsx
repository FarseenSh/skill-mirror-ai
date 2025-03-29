
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import ResourceCard, { Resource } from "@/components/resources/ResourceCard";
import LearningPathCard from "@/components/resources/LearningPathCard";
import StudyStreakCard from "@/components/resources/StudyStreakCard";
import { sampleResources, sampleLearningPaths, studyStreakData } from "@/data/resourcesData";
import { Book, BookOpen, Filter, Search, Sparkles, CheckCircle2, Grid2X2, List, FileText, Video, Code } from "lucide-react";

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { toast } = useToast();

  // Filter resources based on active tab and search query
  const filteredResources = sampleResources.filter((resource) => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
      
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "completed") return matchesSearch && resource.progress === 100;
    if (activeTab === "in-progress") return matchesSearch && resource.progress !== undefined && resource.progress > 0 && resource.progress < 100;
    if (activeTab === "recommended") return matchesSearch && (!resource.progress || resource.progress === 0);
    
    // Filter by resource type
    return matchesSearch && resource.type === activeTab;
  });

  // Handle starting a resource
  const handleStartResource = (id: string) => {
    toast({
      title: "Learning started!",
      description: "Your progress has been initialized.",
      duration: 3000,
    });
  };

  // Handle continuing a resource
  const handleContinueResource = (id: string) => {
    toast({
      title: "Resuming your learning",
      description: "Picking up where you left off.",
      duration: 3000,
    });
  };

  // Handle viewing a learning path
  const handleViewPath = (id: string) => {
    toast({
      title: "Learning path details",
      description: "Viewing the complete path curriculum.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learning Resources</h1>
        <p className="text-muted-foreground">
          Access personalized educational content to enhance your skills.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
                Recommended For You
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {sampleResources
              .filter(r => r.progress === undefined || r.progress === 0)
              .slice(0, 2)
              .map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onStart={handleStartResource}
                  onContinue={handleContinueResource}
                />
              ))}
          </CardContent>
        </Card>

        <StudyStreakCard 
          currentStreak={studyStreakData.currentStreak}
          longestStreak={studyStreakData.longestStreak}
          totalHours={studyStreakData.totalHours}
          lastSevenDays={studyStreakData.lastSevenDays}
        />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
            <TabsList className="grid grid-cols-3 sm:grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="article">Articles</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
              <TabsTrigger value="course">Courses</TabsTrigger>
              <TabsTrigger value="exercise">Exercises</TabsTrigger>
              <TabsTrigger value="completed">
                <CheckCircle2 className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search resources..."
                className="w-full appearance-none pl-8 md:w-[200px] lg:w-[320px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-9 w-9 rounded-none rounded-l-md"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="h-9 w-9 rounded-none rounded-r-md"
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Learning Paths
              </h2>
              <Badge variant="outline" className="text-xs">
                {sampleLearningPaths.length} paths
              </Badge>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sampleLearningPaths.map((path) => (
                <LearningPathCard
                  key={path.id}
                  path={path}
                  onViewPath={handleViewPath}
                />
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium flex items-center">
                <Book className="h-5 w-5 mr-2" />
                Resources
              </h2>
              <Badge variant="outline" className="text-xs">
                {filteredResources.length} resources
              </Badge>
            </div>
            
            {viewMode === "grid" ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    onStart={handleStartResource}
                    onContinue={handleContinueResource}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {filteredResources.map((resource) => (
                      <div key={resource.id} className="flex items-center p-4 gap-4">
                        <div className={`p-3 rounded-full ${
                          resource.type === 'article' ? 'bg-blue-100 text-blue-800' :
                          resource.type === 'video' ? 'bg-purple-100 text-purple-800' :
                          resource.type === 'course' ? 'bg-amber-100 text-amber-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {resource.type === 'article' && <FileText className="h-5 w-5" />}
                          {resource.type === 'video' && <Video className="h-5 w-5" />}
                          {resource.type === 'course' && <BookOpen className="h-5 w-5" />}
                          {resource.type === 'exercise' && <Code className="h-5 w-5" />}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {resource.description}
                          </p>
                          <div className="flex gap-1 mt-1">
                            {resource.category.slice(0, 2).map(cat => (
                              <Badge key={cat} variant="outline" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                            {resource.category.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{resource.category.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 items-center">
                          {resource.progress !== undefined && (
                            <div className="w-16 mr-2">
                              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${resource.progress === 100 ? 'bg-green-500' : 'bg-amber-500'}`} 
                                  style={{ width: `${resource.progress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-right text-muted-foreground mt-1">
                                {resource.progress}%
                              </p>
                            </div>
                          )}
                          
                          {resource.progress === undefined || resource.progress === 0 ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleStartResource(resource.id)}
                            >
                              Start
                            </Button>
                          ) : resource.progress === 100 ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => window.open(resource.url, '_blank')}
                            >
                              Review
                            </Button>
                          ) : (
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleContinueResource(resource.id)}
                            >
                              Continue
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
