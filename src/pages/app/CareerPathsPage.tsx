
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, Award, BookOpen, BriefcaseBusiness, 
  Calendar, Code2, DollarSign, GraduationCap, LineChart,
  TrendingUp, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample career path data
const careerPaths = [
  {
    id: "software-developer",
    name: "Software Developer",
    description: "Grow from junior developer to technical leader",
    levels: [
      {
        title: "Junior Developer",
        description: "Entry-level position focused on coding and learning fundamentals",
        salaryRange: "$50,000 - $80,000",
        yearsExperience: "0-2 years",
        skills: [
          { name: "JavaScript", level: 60, userLevel: 45 },
          { name: "HTML/CSS", level: 70, userLevel: 65 },
          { name: "Git", level: 60, userLevel: 40 },
          { name: "Problem Solving", level: 60, userLevel: 55 }
        ]
      },
      {
        title: "Mid-Level Developer",
        description: "Experienced coder who can work independently on features",
        salaryRange: "$80,000 - $120,000",
        yearsExperience: "2-5 years",
        skills: [
          { name: "JavaScript", level: 80, userLevel: 45 },
          { name: "React/Angular/Vue", level: 75, userLevel: 50 },
          { name: "Backend Technologies", level: 70, userLevel: 30 },
          { name: "System Design", level: 65, userLevel: 25 }
        ]
      },
      {
        title: "Senior Developer",
        description: "Technical leader who mentors others and designs solutions",
        salaryRange: "$120,000 - $160,000",
        yearsExperience: "5-10 years",
        skills: [
          { name: "System Architecture", level: 85, userLevel: 20 },
          { name: "Team Leadership", level: 80, userLevel: 35 },
          { name: "Performance Optimization", level: 85, userLevel: 30 },
          { name: "Technical Decision Making", level: 90, userLevel: 40 }
        ]
      },
      {
        title: "Technical Lead / Architect",
        description: "Designs large-scale systems and guides technical direction",
        salaryRange: "$150,000 - $200,000+",
        yearsExperience: "10+ years",
        skills: [
          { name: "System Architecture", level: 95, userLevel: 20 },
          { name: "Technical Leadership", level: 90, userLevel: 30 },
          { name: "Strategic Planning", level: 85, userLevel: 25 },
          { name: "Cross-team Collaboration", level: 90, userLevel: 40 }
        ]
      }
    ]
  },
  {
    id: "data-science",
    name: "Data Science",
    description: "Progress from analyst to data science leader",
    levels: [
      {
        title: "Data Analyst",
        description: "Entry-level position working with data and basic analysis",
        salaryRange: "$55,000 - $85,000",
        yearsExperience: "0-2 years",
        skills: [
          { name: "SQL", level: 70, userLevel: 35 },
          { name: "Excel/Spreadsheets", level: 80, userLevel: 65 },
          { name: "Data Visualization", level: 65, userLevel: 40 },
          { name: "Basic Statistics", level: 60, userLevel: 30 }
        ]
      },
      {
        title: "Data Scientist",
        description: "Uses statistical methods and models to extract insights",
        salaryRange: "$90,000 - $130,000",
        yearsExperience: "2-5 years",
        skills: [
          { name: "Python", level: 80, userLevel: 40 },
          { name: "Machine Learning", level: 75, userLevel: 25 },
          { name: "Statistical Analysis", level: 85, userLevel: 35 },
          { name: "Data Preprocessing", level: 80, userLevel: 45 }
        ]
      },
      {
        title: "Senior Data Scientist",
        description: "Leads data initiatives and develops advanced models",
        salaryRange: "$120,000 - $170,000",
        yearsExperience: "5-10 years",
        skills: [
          { name: "Advanced ML Models", level: 85, userLevel: 20 },
          { name: "Research Methods", level: 80, userLevel: 25 },
          { name: "Business Strategy", level: 75, userLevel: 40 },
          { name: "Project Leadership", level: 80, userLevel: 35 }
        ]
      },
      {
        title: "AI/ML Director",
        description: "Oversees data science strategy and organizational direction",
        salaryRange: "$160,000 - $250,000+",
        yearsExperience: "10+ years",
        skills: [
          { name: "AI/ML Strategy", level: 90, userLevel: 15 },
          { name: "Team Leadership", level: 85, userLevel: 30 },
          { name: "Research Direction", level: 90, userLevel: 25 },
          { name: "Business Impact", level: 85, userLevel: 35 }
        ]
      }
    ]
  },
  {
    id: "product-management",
    name: "Product Management",
    description: "Grow from associate to senior product leadership",
    levels: [
      {
        title: "Associate Product Manager",
        description: "Entry-level position learning product development processes",
        salaryRange: "$60,000 - $90,000",
        yearsExperience: "0-2 years",
        skills: [
          { name: "Market Research", level: 65, userLevel: 50 },
          { name: "Basic Analytics", level: 60, userLevel: 45 },
          { name: "Communication", level: 70, userLevel: 65 },
          { name: "Product Documentation", level: 65, userLevel: 55 }
        ]
      },
      {
        title: "Product Manager",
        description: "Manages product features and works with development teams",
        salaryRange: "$90,000 - $130,000",
        yearsExperience: "2-5 years",
        skills: [
          { name: "Product Strategy", level: 75, userLevel: 40 },
          { name: "User Experience", level: 80, userLevel: 55 },
          { name: "Stakeholder Management", level: 75, userLevel: 50 },
          { name: "Technical Communication", level: 70, userLevel: 45 }
        ]
      },
      {
        title: "Senior Product Manager",
        description: "Leads product initiatives and manages cross-functional teams",
        salaryRange: "$120,000 - $180,000",
        yearsExperience: "5-10 years",
        skills: [
          { name: "Product Strategy", level: 90, userLevel: 40 },
          { name: "Team Leadership", level: 85, userLevel: 35 },
          { name: "Business Case Development", level: 85, userLevel: 30 },
          { name: "Product Vision", level: 90, userLevel: 35 }
        ]
      },
      {
        title: "Director of Product",
        description: "Oversees product portfolios and drives organizational direction",
        salaryRange: "$160,000 - $250,000+",
        yearsExperience: "10+ years",
        skills: [
          { name: "Executive Communication", level: 90, userLevel: 30 },
          { name: "Portfolio Management", level: 85, userLevel: 25 },
          { name: "Strategic Planning", level: 90, userLevel: 35 },
          { name: "Organizational Leadership", level: 85, userLevel: 30 }
        ]
      }
    ]
  }
];

export default function CareerPathsPage() {
  const [selectedPath, setSelectedPath] = useState(careerPaths[0]);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Career Paths</h1>
        <p className="text-muted-foreground">
          Explore career progression paths and see how your skills compare.
        </p>
      </div>

      <Tabs 
        value={selectedPath.id} 
        onValueChange={(value) => {
          const path = careerPaths.find((p) => p.id === value);
          if (path) setSelectedPath(path);
        }}
      >
        <TabsList>
          {careerPaths.map((path) => (
            <TabsTrigger key={path.id} value={path.id}>
              {path.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={selectedPath.id}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">{selectedPath.name} Path</CardTitle>
              <CardDescription>{selectedPath.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-8">
                {selectedPath.levels.map((level, index) => (
                  <div key={level.title} className="relative">
                    {/* Connecting lines between levels */}
                    {index < selectedPath.levels.length - 1 && (
                      <div className="absolute left-[39px] top-[80px] h-[calc(100%+32px)] w-0.5 bg-muted -z-10"></div>
                    )}
                    
                    <div className="flex gap-6">
                      {/* Level indicator */}
                      <div className="flex-shrink-0 w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xl font-bold">{index + 1}</span>
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl font-semibold">{level.title}</h3>
                            <p className="text-muted-foreground">{level.description}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="flex items-center">
                              <DollarSign className="h-3.5 w-3.5 mr-1" />
                              {level.salaryRange}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              {level.yearsExperience}
                            </Badge>
                          </div>
                        </div>
                        
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Required Skills</CardTitle>
                            <CardDescription>
                              Compare your current skill level with what's needed
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
                              {level.skills.map((skill) => (
                                <div key={skill.name} className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="font-medium">{skill.name}</span>
                                    <span className="text-sm text-muted-foreground">
                                      Your level: {skill.userLevel}%
                                    </span>
                                  </div>
                                  <div className="relative">
                                    <Progress value={skill.userLevel} className="h-2" />
                                    <div 
                                      className="absolute top-0 h-2 border-l-2 border-primary"
                                      style={{ left: `${skill.level}%` }}
                                    ></div>
                                  </div>
                                  <div className="text-right text-xs text-muted-foreground">
                                    Required: {skill.level}%
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 mr-2" />
                  Industry Demand
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Current Demand</span>
                      <span className="text-sm font-medium">High</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Growth Trend</span>
                      <span className="text-sm font-medium">Strong</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Competition</span>
                      <span className="text-sm font-medium">Medium</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    The {selectedPath.name} field is experiencing strong growth with high demand for qualified professionals.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Recommended Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <GraduationCap className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      <span className="font-medium">Essential {selectedPath.name} Certification</span>
                      <p className="text-muted-foreground">Industry-recognized qualification</p>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Code2 className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      <span className="font-medium">Hands-On Projects</span>
                      <p className="text-muted-foreground">Build real-world portfolio pieces</p>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      <span className="font-medium">Professional Network</span>
                      <p className="text-muted-foreground">Join communities in your field</p>
                    </span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  View All Resources <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <BriefcaseBusiness className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Current Level</div>
                      <div className="text-lg font-semibold">Junior Developer</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Next Milestone</div>
                      <div className="text-lg font-semibold">Mid-Level Developer</div>
                      <div className="text-xs text-muted-foreground">
                        Estimated: 9-12 months
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Overall Progress</span>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  
                  <Button className="w-full">
                    View Personalized Roadmap
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
