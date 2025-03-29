
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, UserCheck, Database, User, Clock, Target, FileQuestion } from "lucide-react";

interface InterviewSetupProps {
  onStartInterview: (setupData: any) => void;
  onCancel: () => void;
}

export function InterviewSetup({ onStartInterview, onCancel }: InterviewSetupProps) {
  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const [interviewType, setInterviewType] = useState("technical");
  const [interviewer, setInterviewer] = useState("technical_male");
  const [difficultyLevel, setDifficultyLevel] = useState("mid");
  const [focusAreas, setFocusAreas] = useState<string[]>(["algorithms"]);
  const [timeLimit, setTimeLimit] = useState(30); // in minutes
  const [enableTimeLimit, setEnableTimeLimit] = useState(false);
  const [customQuestions, setCustomQuestions] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onStartInterview({
      jobTitle,
      interviewType,
      interviewer,
      difficultyLevel,
      focusAreas,
      timeLimit: enableTimeLimit ? timeLimit : null,
      customQuestions: customQuestions.trim() ? customQuestions.split('\n').filter(q => q.trim()) : []
    });
  };
  
  // Focus areas based on interview type
  const getFocusAreas = () => {
    switch (interviewType) {
      case "technical":
        return [
          { id: "algorithms", name: "Algorithms & Data Structures" },
          { id: "coding", name: "Coding Implementation" },
          { id: "debugging", name: "Debugging & Problem Solving" },
          { id: "architecture", name: "Software Architecture" }
        ];
      case "behavioral":
        return [
          { id: "teamwork", name: "Teamwork & Collaboration" },
          { id: "leadership", name: "Leadership & Initiative" },
          { id: "challenges", name: "Overcoming Challenges" },
          { id: "communication", name: "Communication Skills" }
        ];
      case "system_design":
        return [
          { id: "scalability", name: "Scalability & Performance" },
          { id: "database", name: "Database Design" },
          { id: "apis", name: "API Design" },
          { id: "architecture", name: "System Architecture" }
        ];
      default:
        return [];
    }
  };
  
  // Reset focus areas when interview type changes
  const handleInterviewTypeChange = (type) => {
    setInterviewType(type);
    // Set default focus area based on the new type
    const areas = getFocusAreas();
    setFocusAreas(areas.length > 0 ? [areas[0].id] : []);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Set Up Your Interview</CardTitle>
        <CardDescription>Configure your practice interview session</CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="job-title">Job Title</Label>
            <Input 
              id="job-title" 
              placeholder="e.g. Software Engineer, Product Manager..." 
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>
          
          {/* Interview Type */}
          <div className="space-y-2">
            <Label htmlFor="interview-type">Interview Type</Label>
            <Select 
              value={interviewType} 
              onValueChange={handleInterviewTypeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select interview type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">
                  <div className="flex items-center">
                    <Database className="mr-2 h-4 w-4" />
                    <span>Technical Interview</span>
                  </div>
                </SelectItem>
                <SelectItem value="behavioral">
                  <div className="flex items-center">
                    <UserCheck className="mr-2 h-4 w-4" />
                    <span>Behavioral Interview</span>
                  </div>
                </SelectItem>
                <SelectItem value="system_design">
                  <div className="flex items-center">
                    <Database className="mr-2 h-4 w-4" />
                    <span>System Design Interview</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Focus Areas */}
          <div className="space-y-2">
            <Label>Focus Areas</Label>
            <div className="grid grid-cols-2 gap-2">
              {getFocusAreas().map(area => (
                <div key={area.id} className="flex items-center space-x-2">
                  <Switch 
                    id={`focus-${area.id}`} 
                    checked={focusAreas.includes(area.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFocusAreas(prev => [...prev, area.id]);
                      } else {
                        setFocusAreas(prev => prev.filter(id => id !== area.id));
                      }
                    }}
                  />
                  <Label htmlFor={`focus-${area.id}`} className="cursor-pointer">
                    {area.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Interviewer Selection */}
          <div className="space-y-3">
            <Label>Choose Your Interviewer</Label>
            <RadioGroup
              value={interviewer}
              onValueChange={setInterviewer}
              className="grid grid-cols-2 gap-4"
            >
              <Label
                htmlFor="interviewer-1"
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
                  interviewer === "technical_male" ? "border-primary" : "border-muted"
                }`}
              >
                <RadioGroupItem
                  value="technical_male"
                  id="interviewer-1"
                  className="sr-only"
                />
                <Avatar className="h-16 w-16 mb-3">
                  <AvatarImage src="/avatars/male-interviewer.jpg" alt="Technical Male Interviewer" />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="font-medium">David Chen</p>
                  <p className="text-sm text-muted-foreground">Technical Lead</p>
                </div>
              </Label>
              
              <Label
                htmlFor="interviewer-2"
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
                  interviewer === "technical_female" ? "border-primary" : "border-muted"
                }`}
              >
                <RadioGroupItem
                  value="technical_female"
                  id="interviewer-2"
                  className="sr-only"
                />
                <Avatar className="h-16 w-16 mb-3">
                  <AvatarImage src="/avatars/female-interviewer.jpg" alt="Technical Female Interviewer" />
                  <AvatarFallback>TF</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Engineering Manager</p>
                </div>
              </Label>
              
              <Label
                htmlFor="interviewer-3"
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
                  interviewer === "coach" ? "border-primary" : "border-muted"
                }`}
              >
                <RadioGroupItem
                  value="coach"
                  id="interviewer-3"
                  className="sr-only"
                />
                <Avatar className="h-16 w-16 mb-3">
                  <AvatarImage src="/avatars/coach.jpg" alt="Interview Coach" />
                  <AvatarFallback>IC</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="font-medium">Michael Taylor</p>
                  <p className="text-sm text-muted-foreground">Interview Coach</p>
                </div>
              </Label>
            </RadioGroup>
          </div>
          
          {/* Difficulty Level */}
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select 
              value={difficultyLevel} 
              onValueChange={setDifficultyLevel}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid">Mid-Level</SelectItem>
                <SelectItem value="senior">Senior Level</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Time Limit */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="time-limit" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Time Limit
              </Label>
              <Switch 
                id="enable-time" 
                checked={enableTimeLimit}
                onCheckedChange={setEnableTimeLimit}
              />
            </div>
            
            {enableTimeLimit && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Time per question: {timeLimit} minutes</span>
                </div>
                <Slider
                  value={[timeLimit]}
                  min={1}
                  max={60}
                  step={1}
                  onValueChange={(value) => setTimeLimit(value[0])}
                />
              </div>
            )}
          </div>
          
          {/* Custom Questions */}
          <div className="space-y-2">
            <Label htmlFor="custom-questions" className="flex items-center">
              <FileQuestion className="h-4 w-4 mr-2" />
              Custom Questions (Optional)
            </Label>
            <Textarea 
              id="custom-questions"
              placeholder="Enter your own questions (one per line)"
              value={customQuestions}
              onChange={(e) => setCustomQuestions(e.target.value)}
              className="h-24"
            />
            <p className="text-xs text-muted-foreground">
              If provided, these will be added to the generated questions.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="justify-between">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Start Interview</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
