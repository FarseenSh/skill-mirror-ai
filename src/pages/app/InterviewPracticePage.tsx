
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Mic, MicOff, Play, Pause, SkipBack, Volume2, Star, MessageSquare, Clock, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { elevenLabsService, ELEVEN_LABS_VOICES } from "@/services/elevenLabsService";
import { interviewsManager } from "@/lib/supabase";
import { InterviewSimulator } from "@/components/interview/InterviewSimulator";
import { InterviewDashboard } from "@/components/interview/InterviewDashboard";

const interviewTypes = [
  { id: "technical", name: "Technical Interview", description: "Assess your technical knowledge and problem-solving abilities" },
  { id: "behavioral", name: "Behavioral Interview", description: "Practice answering questions about your past experiences and soft skills" },
  { id: "system_design", name: "System Design Interview", description: "Demonstrate your ability to design complex systems and architecture" }
];

const difficultyLevels = [
  { id: "entry", name: "Entry Level" },
  { id: "mid", name: "Mid-Level" },
  { id: "senior", name: "Senior Level" }
];

export default function InterviewPracticePage() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState("dashboard"); // dashboard or simulator
  const [selectedInterview, setSelectedInterview] = useState(null);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Interview Practice</h1>
        <p className="text-muted-foreground">
          Prepare for job interviews with AI-powered practice sessions.
        </p>
      </div>

      <Tabs defaultValue="dashboard" value={activeView} onValueChange={setActiveView}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="simulator">Interview Simulator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-4">
          <InterviewDashboard 
            onStartNewInterview={() => setActiveView("simulator")} 
            onContinueInterview={(interview) => {
              setSelectedInterview(interview);
              setActiveView("simulator");
            }}
          />
        </TabsContent>
        
        <TabsContent value="simulator">
          <InterviewSimulator 
            selectedInterview={selectedInterview} 
            onExit={() => {
              setSelectedInterview(null);
              setActiveView("dashboard");
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
