import { useState, useEffect } from 'react';
import { useAuth } from "@/components/AuthProvider";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { SimulationHeader } from '@/components/workspace/SimulationHeader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamChat, ChatMessage } from '@/components/workspace/TeamChat';
import { TaskCard } from '@/components/workspace/TaskCard';
import { CodeWorkspace } from '@/components/workspace/CodeWorkspace';
import { SkillImprovement } from '@/components/workspace/SkillImprovement';
import { v4 as uuidv4 } from 'uuid';

export default function WorkspacePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [simulationDay, setSimulationDay] = useState(1);
  const [currentTime, setCurrentTime] = useState('9:15 AM');
  const [isPaused, setIsPaused] = useState(false);
  const [showSkillImprovement, setShowSkillImprovement] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      sender: {
        name: 'Sarah Chen',
        role: 'Team Lead',
        avatar: '/avatars/sarah.jpg'
      },
      content: "Hi Alex! Welcome to TechStart. I've assigned you a small bug fix to get familiar with our codebase. Let me know if you have any questions!",
      timestamp: '9:05 AM'
    }
  ]);

  const problemCode = `function validateToken(token) {
  try {
    // Bug appears to be here
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  } catch (error) {
    // Token validation fails silently
    return null;
  }
}`;

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        const time = new Date();
        time.setHours(9);
        time.setMinutes(Math.floor(Math.random() * 59));
        setCurrentTime(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }, 60000);
      
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "Simulation resumed" : "Simulation paused",
      description: isPaused ? "The workday will continue." : "The workday is now paused.",
    });
  };

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: uuidv4(),
      sender: {
        name: user?.profile?.full_name || 'You',
        isUser: true,
        avatar: user?.profile?.avatar_url
      },
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sending'
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 1000);
    
    const typingMessage: ChatMessage = {
      id: uuidv4(),
      sender: {
        name: 'Sarah Chen',
        role: 'Team Lead',
        avatar: '/avatars/sarah.jpg'
      },
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isTyping: true
    };
    
    setTimeout(() => {
      setMessages(prev => [...prev, typingMessage]);
    }, 1500);
    
    setTimeout(() => {
      let responseContent = '';
      
      if (content.toLowerCase().includes('authentication') || content.toLowerCase().includes('bug')) {
        responseContent = "Great question! Yes, check the error logs in the dashboard. Users are getting kicked out right after registration, and the error seems related to token validation. It could be that we're not handling JWT errors properly.";
      } else if (content.toLowerCase().includes('hello') || content.toLowerCase().includes('hi')) {
        responseContent = "Hello! How are you doing with the authentication bug fix?";
      } else if (content.toLowerCase().includes('done') || content.toLowerCase().includes('fixed')) {
        responseContent = "That's great! I'll review your solution soon. Nice work on implementing proper error handling.";
        setTimeout(() => {
          setShowSkillImprovement(true);
        }, 2000);
      } else {
        responseContent = "Thanks for the update! Let me know if you need any help with the authentication issue.";
      }
      
      setMessages(prev => 
        prev.filter(msg => !msg.isTyping).concat({
          id: uuidv4(),
          sender: {
            name: 'Sarah Chen',
            role: 'Team Lead',
            avatar: '/avatars/sarah.jpg'
          },
          content: responseContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })
      );
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id ? { ...msg, status: 'read' } : msg
        )
      );
    }, 4000);
  };

  const handleSubmitSolution = (solution: string) => {
    toast({
      title: "Solution submitted",
      description: "Your solution has been submitted for review.",
    });
    
    setTimeout(() => {
      handleSendMessage("I've just submitted my solution for the authentication bug fix.");
    }, 500);
  };

  const handleViewSkillsDashboard = () => {
    navigate('/app/skills');
  };

  return (
    <>
      <SimulationHeader 
        simulationDay={simulationDay}
        currentTime={currentTime}
        isPaused={isPaused}
        onTogglePause={handleTogglePause}
        userName={user?.profile?.full_name || ''}
      />
      
      <div className="space-y-6 mt-4">
        <Card>
          <CardHeader className="pb-2">
            <div>
              <CardTitle>Welcome to Your First Day!</CardTitle>
              <p className="text-sm text-muted-foreground">TechStart Inc. - Junior Software Engineer</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Welcome to TechStart! Your team lead Sarah has assigned you your first task to get familiar with the codebase. You'll need to fix a small bug in the user authentication flow.
            </p>
            
            <TaskCard 
              title="Current Task: Bug Fix in Authentication Flow"
              description="Users are reporting they sometimes can't log in after registration. The issue appears to be in the token validation process. Review the code and propose a fix."
              priority="Medium"
              dueDate="Today"
              dueTime="4:00 PM"
            />
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <CodeWorkspace 
              problemCode={problemCode}
              onSubmitSolution={handleSubmitSolution}
            />
            
            {showSkillImprovement && (
              <SkillImprovement 
                skillName="debugging"
                improvementPercentage={5}
                skillContext="your approach to the authentication issue"
                onViewDashboard={handleViewSkillsDashboard}
              />
            )}
          </div>
          
          <div className="lg:col-span-1 h-[600px]">
            <TeamChat 
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
