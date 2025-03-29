
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Loader2, Send, User, Bot, 
  FileCode, ListTodo, BarChart, 
  MessageSquare, Sparkles
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { VoicePlayer } from '@/components/VoicePlayer';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import claudeService, { AI_PERSONALITIES } from '@/services/claudeService';
import elevenLabsService, { ELEVEN_LABS_VOICES } from '@/services/elevenLabsService';
import { conversationsManager, aiColleaguesManager } from '@/lib/supabase';
import { ScrollArea } from '@/components/ui/scroll-area';
import useRealtimeSubscription from '@/hooks/useRealtimeSubscription';
import { ChatMessage, ChatMessageProps, MessageStatus } from '@/components/workspace/ChatMessage';
import { TaskPanel } from '@/components/workspace/TaskPanel';
import { CodeEditor } from '@/components/workspace/CodeEditor';
import { SkillProgressTracker } from '@/components/workspace/SkillProgressTracker';
import { workplaceTasks, authBugFixTask } from '@/data/workplaceTasks';
import { sampleSkills } from '@/data/skillsData';

type AIColleague = {
  id: string;
  name: string;
  role: string;
  avatar_url: string | null;
  personality: string;
  voice_id: string | null;
};

interface Message {
  id?: string;
  conversation_id?: string;
  sender_type: 'user' | 'ai' | 'system';
  content: string;
  created_at?: string;
  audio_url?: string;
  status?: MessageStatus;
}

export default function WorkspacePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentColleague, setCurrentColleague] = useState<AIColleague | null>(null);
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [audioCaching, setAudioCaching] = useState<Record<string, string>>({});
  const [colleagues, setColleagues] = useState<AIColleague[]>([]);
  const [workspaceTab, setWorkspaceTab] = useState<string>('chat');
  const [tasks, setTasks] = useState(workplaceTasks);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [currentTaskCode, setCurrentTaskCode] = useState<string>('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [skills, setSkills] = useState(sampleSkills);
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  const { data: messages, setData: setMessages } = useRealtimeSubscription<Message>(
    'messages',
    [],
    currentConversation ? { conversation_id: currentConversation } : undefined
  );
  
  useEffect(() => {
    const loadColleagues = async () => {
      try {
        const aiColleagues = await aiColleaguesManager.getAllColleagues();
        setColleagues(aiColleagues as AIColleague[]);
      } catch (error) {
        console.error("Error loading AI colleagues:", error);
        toast({
          title: "Error loading colleagues",
          description: "Failed to load AI colleagues",
          variant: "destructive",
        });
      }
    };
    
    loadColleagues();
  }, [toast]);

  useEffect(() => {
    const loadConversations = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const userConversations = await conversationsManager.getUserConversations(user.id);
        setConversations(userConversations);
      } catch (error) {
        toast({
          title: "Error loading conversations",
          description: "Failed to load your conversations",
          variant: "destructive",
        });
        console.error("Error loading conversations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadConversations();
  }, [user, toast]);
  
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    // Set selected task code when task is selected
    if (selectedTask) {
      const task = tasks.find(t => t.id === selectedTask);
      if (task && task.codeSnippet) {
        setCurrentTaskCode(task.codeSnippet);
      } else {
        setCurrentTaskCode('// No code associated with this task yet');
      }
    }
  }, [selectedTask, tasks]);
  
  const selectColleague = (colleague: AIColleague) => {
    setCurrentColleague(colleague);
    setCurrentConversation(null);
    setMessages([]);
  };
  
  const startNewConversation = async () => {
    if (!user || !currentColleague) return;
    
    try {
      setIsLoading(true);
      
      const title = `Chat with ${currentColleague.name}`;
      const initialMessage = `Hello ${currentColleague.name}, I'd like to discuss some work scenarios with you.`;
      
      const result = await claudeService.createConversation(
        user.id,
        currentColleague.id,
        title,
        initialMessage
      );
      
      setCurrentConversation(result.conversation.id);
      
      const typedMessages = result.messages as unknown as Message[];
      setMessages(typedMessages);
      
      setConversations(prev => [result.conversation, ...prev]);
      
      if (currentColleague.voice_id) {
        try {
          const aiMessage = result.messages.find(m => m.sender_type === 'ai');
          if (aiMessage) {
            const audioUrl = await elevenLabsService.generateVoiceSample(
              aiMessage.content,
              currentColleague.voice_id
            );
            
            setAudioCaching(prev => ({
              ...prev,
              [aiMessage.content]: audioUrl,
            }));
          }
        } catch (audioError) {
          console.error("Error generating audio:", audioError);
        }
      }
    } catch (error) {
      toast({
        title: "Error starting conversation",
        description: "Failed to start a new conversation",
        variant: "destructive",
      });
      console.error("Error starting conversation:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const loadConversation = async (conversationId: string) => {
    try {
      setIsLoading(true);
      
      const conversation = conversations.find(c => c.id === conversationId);
      if (!conversation) return;
      
      const colleague = colleagues.find(c => c.id === conversation.ai_colleague_id);
      if (!colleague) return;
      
      setCurrentColleague(colleague);
      setCurrentConversation(conversationId);
      
      const conversationMessages = await conversationsManager.getConversationMessages(conversationId);
      setMessages(conversationMessages as Message[]);
      
      if (colleague.voice_id) {
        const aiMessages = conversationMessages.filter(m => m.sender_type === 'ai');
        
        for (const msg of aiMessages) {
          if (!audioCaching[msg.content]) {
            try {
              const audioUrl = await elevenLabsService.generateVoiceSample(
                msg.content,
                colleague.voice_id
              );
              
              setAudioCaching(prev => ({
                ...prev,
                [msg.content]: audioUrl,
              }));
            } catch (audioError) {
              console.error("Error generating audio for existing message:", audioError);
            }
          }
        }
      }
    } catch (error) {
      toast({
        title: "Error loading conversation",
        description: "Failed to load the conversation messages",
        variant: "destructive",
      });
      console.error("Error loading conversation:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTaskSelection = async (taskId: string) => {
    setSelectedTask(taskId);
    
    // If there's an active conversation, add task context to it
    if (currentConversation) {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        try {
          await claudeService.addTaskContextToConversation(
            currentConversation,
            task.id,
            task.title,
            task.description,
            task.codeSnippet
          );
          
          // Add system message to UI about task context
          const contextMessage: Message = {
            sender_type: 'system',
            content: `[Switched to task: ${task.title}]`,
            created_at: new Date().toISOString(),
          };
          
          // Create a new array instead of modifying the previous one
          const updatedMessages: Message[] = [...messages, contextMessage];
          setMessages(updatedMessages);
          
          // Automatically suggest discussing the task
          await sendMessage(`Let's discuss how to approach this task: ${task.title}`);
        } catch (error) {
          console.error("Error adding task context:", error);
        }
      }
    }
  };
  
  const sendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || message;
    if (!messageToSend.trim() || !currentConversation || !user) return;
    
    try {
      // Add the user message to the UI immediately with "sending" status
      const userMessage: Message = {
        sender_type: 'user',
        content: messageToSend,
        created_at: new Date().toISOString(),
        status: 'sending'
      };
      
      // Create a new array instead of modifying the previous one
      const messagesWithUserMessage: Message[] = [...messages, userMessage];
      setMessages(messagesWithUserMessage);
      
      if (!customMessage) {
        setMessage('');
      }
      
      // Set AI typing indicator
      setIsAiTyping(true);
      
      // Update message status to "sent"
      setTimeout(() => {
        const updatedMessages: Message[] = messages.map(msg => 
          msg.content === messageToSend && msg.sender_type === 'user' && msg.status === 'sending' 
            ? { ...msg, status: 'sent' as MessageStatus } 
            : msg
        );
        
        setMessages(updatedMessages);
      }, 500);
      
      // Call Claude API
      const aiMessage = await claudeService.addMessageToConversation(
        currentConversation,
        messageToSend
      );
      
      // Update message status to "delivered"
      const messagesWithDeliveredStatus: Message[] = messages.map(msg => 
        msg.content === messageToSend && msg.sender_type === 'user' && msg.status === 'sent' 
          ? { ...msg, status: 'delivered' as MessageStatus } 
          : msg
      );
      
      setMessages(messagesWithDeliveredStatus);
      
      // Generate voice if available
      if (currentColleague?.voice_id) {
        try {
          const audioUrl = await elevenLabsService.generateVoiceSample(
            aiMessage.content,
            currentColleague.voice_id
          );
          
          setAudioCaching(prev => ({
            ...prev,
            [aiMessage.content]: audioUrl,
          }));
        } catch (audioError) {
          console.error("Error generating audio:", audioError);
        }
      }
      
      // Update message status to "read"
      const messagesWithReadStatus: Message[] = messages.map(msg => 
        msg.content === messageToSend && msg.sender_type === 'user' && msg.status === 'delivered' 
          ? { ...msg, status: 'read' as MessageStatus } 
          : msg
      );
      
      setMessages(messagesWithReadStatus);
      
      // Check if this conversation is about a task and update skills accordingly
      if (selectedTask) {
        updateSkillsBasedOnTask(selectedTask);
      }
      
      // Turn off typing indicator
      setIsAiTyping(false);
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Failed to send your message",
        variant: "destructive",
      });
      console.error("Error sending message:", error);
      setIsAiTyping(false);
    }
  };
  
  const handleCodeChange = (newCode: string) => {
    setCurrentTaskCode(newCode);
  };
  
  const handleSaveCode = (code: string, taskId: string) => {
    // Update the task with the new code
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, codeSnippet: code } 
          : task
      )
    );
    
    toast({
      title: "Code saved",
      description: "Your changes have been saved successfully",
    });
    
    // If there's an active conversation, notify about the code update
    if (currentConversation) {
      sendMessage("I've updated the code for this task. Can you review the changes?");
    }
  };
  
  const updateSkillsBasedOnTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // Simulate skill improvement based on task
    const updatedSkills = [...skills];
    
    task.skillsInvolved.forEach(taskSkill => {
      const skillIndex = updatedSkills.findIndex(s => 
        s.name.toLowerCase() === taskSkill.name.toLowerCase()
      );
      
      if (skillIndex >= 0) {
        // Increase skill by a small amount (1-3%)
        const improvement = Math.floor(Math.random() * 3) + 1;
        const newProficiency = Math.min(updatedSkills[skillIndex].proficiency + improvement, 100);
        
        updatedSkills[skillIndex] = {
          ...updatedSkills[skillIndex],
          proficiency: newProficiency,
          recentImprovement: true
        };
        
        // Show toast if significant improvement or target reached
        if (improvement > 1 || newProficiency >= updatedSkills[skillIndex].targetProficiency) {
          toast({
            title: `${taskSkill.name} skill improved!`,
            description: `Your ${taskSkill.name} proficiency increased to ${newProficiency}%`,
          });
        }
      }
    });
    
    setSkills(updatedSkills);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Workspace</h1>
        <p className="text-muted-foreground">
          Collaborate with AI colleagues on tasks and projects
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>AI Colleagues</CardTitle>
            <CardDescription>
              Work with colleagues on tasks and scenarios
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {colleagues.map((colleague) => (
                <div 
                  key={colleague.id}
                  className={`p-4 cursor-pointer flex items-center gap-3 hover:bg-muted transition-colors ${
                    currentColleague?.id === colleague.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => selectColleague(colleague)}
                >
                  <Avatar>
                    <AvatarImage src={colleague.avatar_url || undefined} />
                    <AvatarFallback>{getInitials(colleague.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{colleague.name}</h3>
                    <p className="text-sm text-muted-foreground">{colleague.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          {!currentColleague ? (
            <div className="flex flex-col items-center justify-center h-[600px] p-6">
              <Bot size={64} className="text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Select an AI Colleague</h2>
              <p className="text-muted-foreground text-center mb-6">
                Choose a colleague from the list to start a conversation or continue an existing one.
              </p>
            </div>
          ) : !currentConversation ? (
            <div className="flex flex-col items-center justify-center h-[600px] p-6">
              <div className="text-center max-w-md mx-auto">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={currentColleague.avatar_url || undefined} />
                  <AvatarFallback className="text-xl">{getInitials(currentColleague.name)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold mb-2">{currentColleague.name}</h2>
                <p className="text-sm text-muted-foreground mb-1">{currentColleague.role}</p>
                
                {conversations.filter(c => c.ai_colleague_id === currentColleague.id).length > 0 && (
                  <div className="mt-6 mb-4">
                    <h3 className="text-sm font-medium mb-2">Previous Conversations</h3>
                    <div className="space-y-2">
                      {conversations
                        .filter(c => c.ai_colleague_id === currentColleague.id)
                        .map(conv => (
                          <Button 
                            key={conv.id} 
                            variant="outline" 
                            className="w-full justify-start"
                            onClick={() => loadConversation(conv.id)}
                          >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            {conv.title}
                          </Button>
                        ))
                      }
                    </div>
                  </div>
                )}
                
                <Button 
                  className="mt-4" 
                  onClick={startNewConversation}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Start New Conversation
                </Button>
              </div>
            </div>
          ) : (
            <>
              <CardHeader className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={currentColleague.avatar_url || undefined} />
                      <AvatarFallback>{getInitials(currentColleague.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{currentColleague.name}</CardTitle>
                      <CardDescription>{currentColleague.role}</CardDescription>
                    </div>
                  </div>
                  <Tabs value={workspaceTab} onValueChange={setWorkspaceTab}>
                    <TabsList>
                      <TabsTrigger value="chat" className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>Chat</span>
                      </TabsTrigger>
                      <TabsTrigger value="tasks" className="flex items-center">
                        <ListTodo className="h-4 w-4 mr-1" />
                        <span>Tasks</span>
                      </TabsTrigger>
                      <TabsTrigger value="code" className="flex items-center">
                        <FileCode className="h-4 w-4 mr-1" />
                        <span>Code</span>
                      </TabsTrigger>
                      <TabsTrigger value="skills" className="flex items-center">
                        <BarChart className="h-4 w-4 mr-1" />
                        <span>Skills</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              
              <TabsContent value="chat" className="m-0">
                <ScrollArea className="h-[500px] p-4">
                  <div className="space-y-4">
                    {messages.map((msg, i) => {
                      if (msg.sender_type === 'system') {
                        return (
                          <div key={msg.id || i} className="flex justify-center">
                            <div className="bg-muted rounded-md px-3 py-1 text-xs text-muted-foreground">
                              {msg.content}
                            </div>
                          </div>
                        );
                      }
                      
                      return (
                        <ChatMessage 
                          key={msg.id || i}
                          id={msg.id || `msg-${i}`}
                          content={msg.content}
                          senderType={msg.sender_type}
                          senderName={msg.sender_type === 'user' ? (user?.profile?.full_name || 'You') : currentColleague.name}
                          senderAvatar={msg.sender_type === 'user' ? user?.profile?.avatar_url : currentColleague.avatar_url || undefined}
                          timestamp={new Date(msg.created_at || Date.now())}
                          audioUrl={msg.sender_type === 'ai' && audioCaching[msg.content] ? audioCaching[msg.content] : undefined}
                          status={msg.sender_type === 'user' ? msg.status : undefined}
                        />
                      );
                    })}
                    
                    {isAiTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-lg p-3 flex items-center space-x-2 max-w-[80%]">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={currentColleague.avatar_url || undefined} />
                            <AvatarFallback>{getInitials(currentColleague.name)}</AvatarFallback>
                          </Avatar>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messageEndRef} />
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      className="min-h-10"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      disabled={isLoading || isAiTyping}
                    />
                    <Button 
                      size="icon" 
                      onClick={() => sendMessage()}
                      disabled={isLoading || isAiTyping || !message.trim()}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tasks" className="m-0 p-4">
                <TaskPanel 
                  tasks={tasks} 
                  onSelectTask={handleTaskSelection}
                  selectedTaskId={selectedTask}
                />
              </TabsContent>
              
              <TabsContent value="code" className="m-0 p-4">
                {selectedTask ? (
                  <CodeEditor 
                    initialCode={currentTaskCode}
                    taskId={selectedTask}
                    onCodeChange={handleCodeChange}
                    onSaveCode={handleSaveCode}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px]">
                    <FileCode size={48} className="text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Task Selected</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                      Select a task from the Tasks tab to view and edit code.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="skills" className="m-0 p-4">
                <SkillProgressTracker skills={skills} />
              </TabsContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
