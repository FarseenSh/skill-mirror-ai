
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import sampleSkills from "@/data/skillsData";
import { targetRoles } from "@/data/resourcesData";
import SkillProgressTracker from "@/components/workspace/SkillProgressTracker";
import SkillRadarChart from "@/components/dashboard/SkillRadarChart";
import SkillTrendsChart from "@/components/dashboard/SkillTrendsChart";
import SkillAchievements from "@/components/dashboard/SkillAchievements";
import { Award, BarChart, LineChart, Target, TrendingUp } from "lucide-react";

export default function SkillsDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedRole, setSelectedRole] = useState(targetRoles[0].id);
  const { toast } = useToast();

  // Get selected role data
  const targetRole = targetRoles.find(r => r.id === selectedRole);

  // Handler for improving a skill (for demonstration purposes)
  const handleImproveSkill = (skillId: string) => {
    toast({
      title: "Skill improved!",
      description: "Your skill proficiency has been updated.",
      duration: 3000,
    });
  };

  // Handler for completing an achievement
  const handleUnlockAchievement = (achievementId: string) => {
    toast({
      title: "Achievement unlocked!",
      description: "Congratulations on your progress!",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Skills Dashboard</h1>
        <p className="text-muted-foreground">
          Track and analyze your skill development progress.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-1">
              <LineChart className="h-4 w-4" />
              <span>Growth Trends</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span>Achievements</span>
            </TabsTrigger>
            <TabsTrigger value="career" className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span>Career Fit</span>
            </TabsTrigger>
          </TabsList>
        
          <TabsContent value="overview" className="mt-0 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <SkillRadarChart 
                skills={sampleSkills} 
              />
              <SkillProgressTracker skills={sampleSkills} />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Skill Recommendations</CardTitle>
                <CardDescription>
                  Based on your goals and progress, here are some recommended skills to focus on.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleSkills
                    .filter(skill => skill.proficiency < skill.targetProficiency)
                    .sort((a, b) => (b.targetProficiency - b.proficiency) - (a.targetProficiency - a.proficiency))
                    .slice(0, 3)
                    .map(skill => (
                      <div key={skill.id} className="flex items-center justify-between border-b pb-3">
                        <div>
                          <h3 className="font-medium">{skill.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Current: {skill.proficiency}% / Target: {skill.targetProficiency}%
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleImproveSkill(skill.id)}
                        >
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Improve
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="mt-0">
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {sampleSkills.slice(0, 4).map((skill) => (
                  <SkillTrendsChart
                    key={skill.id}
                    skillId={skill.id}
                    name={skill.name}
                    currentProficiency={skill.proficiency}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-0">
            <SkillAchievements skills={sampleSkills} />
          </TabsContent>

          <TabsContent value="career" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{targetRole?.name} Role Overview</CardTitle>
                  <CardDescription>{targetRole?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {targetRole?.skills.map((skillReq) => {
                      const userSkill = sampleSkills.find((s) => s.name === skillReq.name);
                      const currentLevel = userSkill?.proficiency || 0;
                      const gap = skillReq.required - currentLevel;
                      
                      return (
                        <div key={skillReq.name} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="font-medium">{skillReq.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {currentLevel}% / {skillReq.required}% required
                            </span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${gap <= 0 ? 'bg-green-500' : 'bg-amber-500'}`} 
                              style={{ width: `${Math.min(currentLevel, skillReq.required)}%` }}
                            ></div>
                          </div>
                          {gap > 0 && (
                            <p className="text-xs text-muted-foreground">
                              {gap}% skill gap - Estimated {Math.ceil(gap / 5)} weeks to achieve
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              
              <SkillRadarChart 
                skills={sampleSkills} 
                targetRole={{
                  name: targetRole?.name || '',
                  skills: targetRole?.skills || []
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {activeTab === "career" && (
        <div className="ml-4 flex-shrink-0">
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {targetRoles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
