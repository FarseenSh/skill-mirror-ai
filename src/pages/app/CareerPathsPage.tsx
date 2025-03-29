
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { targetRoles } from "@/data/resourcesData";
import sampleSkills from "@/data/skillsData";
import SkillRadarChart from "@/components/dashboard/SkillRadarChart";
import { BriefcaseBusiness, GraduationCap, LineChart, Briefcase, Clock, Calendar, ArrowRight, Award, Share2 } from "lucide-react";

export default function CareerPathsPage() {
  const [selectedRole, setSelectedRole] = useState(targetRoles[0].id);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Get selected role data
  const targetRole = targetRoles.find(r => r.id === selectedRole);

  // Calculate role match score
  const calculateMatchScore = (roleId: string) => {
    const role = targetRoles.find(r => r.id === roleId);
    if (!role) return 0;
    
    let totalPoints = 0;
    let earnedPoints = 0;
    
    role.skills.forEach(reqSkill => {
      const userSkill = sampleSkills.find(s => s.name === reqSkill.name);
      const userProficiency = userSkill?.proficiency || 0;
      
      totalPoints += reqSkill.required;
      earnedPoints += Math.min(userProficiency, reqSkill.required);
    });
    
    return Math.round((earnedPoints / totalPoints) * 100);
  };

  // Get estimated timeline to achieve role
  const getEstimatedTimeline = (roleId: string) => {
    const role = targetRoles.find(r => r.id === roleId);
    if (!role) return { months: 0, skills: [] };
    
    const skillGaps = role.skills.map(reqSkill => {
      const userSkill = sampleSkills.find(s => s.name === reqSkill.name);
      const userProficiency = userSkill?.proficiency || 0;
      return {
        name: reqSkill.name,
        gap: Math.max(0, reqSkill.required - userProficiency)
      };
    }).filter(skill => skill.gap > 0);
    
    // Estimate: average 5% improvement per month per skill
    const totalMonths = Math.ceil(Math.max(...skillGaps.map(s => s.gap)) / 5);
    
    return {
      months: totalMonths,
      skills: skillGaps.sort((a, b) => b.gap - a.gap)
    };
  };

  const roleTimeline = getEstimatedTimeline(selectedRole);
  const matchScore = calculateMatchScore(selectedRole);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Career Paths</h1>
        <p className="text-muted-foreground">
          Visualize and plan your professional career progression.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {targetRoles.map(role => {
          const score = calculateMatchScore(role.id);
          const isActive = role.id === selectedRole;
          
          return (
            <Card 
              key={role.id} 
              className={`cursor-pointer hover:shadow-md transition-all ${isActive ? 'ring-2 ring-primary ring-offset-2' : ''}`}
              onClick={() => setSelectedRole(role.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <Badge className="bg-indigo-100 text-indigo-800">Role Path</Badge>
                  <Badge variant={score >= 70 ? "default" : "outline"}>
                    {score}% Match
                  </Badge>
                </div>
                <CardTitle className="text-lg">{role.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{role.description}</p>
                <div className="flex items-center text-sm text-primary">
                  <span>View details</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {targetRole && (
        <>
          <div className="flex items-center justify-between">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList>
                <TabsTrigger value="overview" className="flex items-center gap-1">
                  <BriefcaseBusiness className="h-4 w-4" />
                  <span>Role Overview</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-1">
                  <LineChart className="h-4 w-4" />
                  <span>Skills Comparison</span>
                </TabsTrigger>
                <TabsTrigger value="plan" className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  <span>Development Plan</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <TabsContent value="overview" className="mt-0 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">{targetRole.name}</CardTitle>
                    <CardDescription>{targetRole.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button variant="default" size="sm">
                      <Award className="h-4 w-4 mr-1" />
                      Set as Goal
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="border rounded-lg p-4 text-center">
                    <div className="flex justify-center mb-2 text-amber-500">
                      <LineChart className="h-10 w-10" />
                    </div>
                    <div className="text-3xl font-bold mb-1">{matchScore}%</div>
                    <div className="text-sm text-muted-foreground">Match Score</div>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center">
                    <div className="flex justify-center mb-2 text-blue-500">
                      <Clock className="h-10 w-10" />
                    </div>
                    <div className="text-3xl font-bold mb-1">{roleTimeline.months}</div>
                    <div className="text-sm text-muted-foreground">Months to Achieve</div>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center">
                    <div className="flex justify-center mb-2 text-purple-500">
                      <Briefcase className="h-10 w-10" />
                    </div>
                    <div className="text-3xl font-bold mb-1">{roleTimeline.skills.length}</div>
                    <div className="text-sm text-muted-foreground">Skills to Improve</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Critical Skills</h3>
                  <div className="space-y-4">
                    {targetRole.skills
                      .sort((a, b) => b.required - a.required)
                      .slice(0, 3)
                      .map(skill => {
                        const userSkill = sampleSkills.find(s => s.name === skill.name);
                        const userProficiency = userSkill?.proficiency || 0;
                        
                        return (
                          <div key={skill.name} className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium">{skill.name}</h4>
                              <div className="flex justify-between text-sm text-muted-foreground mb-1">
                                <span>Your level: {userProficiency}%</span>
                                <span>Required: {skill.required}%</span>
                              </div>
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${userProficiency >= skill.required ? 'bg-green-500' : 'bg-amber-500'}`} 
                                  style={{ width: `${Math.min(userProficiency, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="ml-4"
                              disabled={userProficiency >= skill.required}
                            >
                              Improve
                            </Button>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="mt-0 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <SkillRadarChart 
                skills={sampleSkills} 
                targetRole={{
                  name: targetRole.name,
                  skills: targetRole.skills
                }}
              />
              
              <Card>
                <CardHeader>
                  <CardTitle>Skills Gap Analysis</CardTitle>
                  <CardDescription>
                    Compare your current skills with the requirements for {targetRole.name}.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {targetRole.skills.map((skillReq) => {
                      const userSkill = sampleSkills.find((s) => s.name === skillReq.name);
                      const currentLevel = userSkill?.proficiency || 0;
                      const gap = skillReq.required - currentLevel;
                      
                      return (
                        <div key={skillReq.name} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="font-medium">{skillReq.name}</span>
                            <span className="text-sm text-muted-foreground">
                              Gap: {gap > 0 ? `${gap}%` : 'None'}
                            </span>
                          </div>
                          <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                            {/* Current level */}
                            <div 
                              className="absolute h-full bg-primary rounded-full" 
                              style={{ width: `${currentLevel}%` }}
                            ></div>
                            {/* Required level marker */}
                            <div 
                              className="absolute h-full border-l-2 border-red-500 z-10" 
                              style={{ left: `${skillReq.required}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Current: {currentLevel}%</span>
                            <span className="font-medium">Required: {skillReq.required}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="plan" className="mt-0 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Development Plan</CardTitle>
                <CardDescription>
                  Your roadmap to becoming a {targetRole.name} in {roleTimeline.months} months.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="relative flex h-14 items-center justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background z-10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="absolute h-full w-px bg-border top-0 left-5" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">Start: Today</h3>
                      <p className="text-sm text-muted-foreground">
                        Current match score: {matchScore}%
                      </p>
                    </div>
                  </div>
                  
                  {roleTimeline.skills.map((skill, index) => {
                    const monthsToAchieve = Math.ceil(skill.gap / 5);
                    const isLast = index === roleTimeline.skills.length - 1;
                    
                    return (
                      <div key={skill.name} className="flex items-center">
                        <div className="relative flex h-24 items-center justify-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-muted z-10">
                            <span className="text-sm font-medium">{index + 1}</span>
                          </div>
                          {!isLast && <div className="absolute h-full w-px bg-border top-0 left-5" />}
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">Focus on {skill.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Close {skill.gap}% gap in approximately {monthsToAchieve} month{monthsToAchieve > 1 ? 's' : ''}
                          </p>
                          <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                            View recommended resources
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="flex items-center">
                    <div className="relative flex h-14 items-center justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-green-500 bg-green-50 z-10">
                        <Award className="h-5 w-5 text-green-500" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">Goal: {targetRole.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Estimated completion in {roleTimeline.months} months
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </>
      )}
    </div>
  );
}
