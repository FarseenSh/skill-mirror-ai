
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send, PenLine, Mic, User, Bot } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { VoicePlayer } from '@/components/VoicePlayer';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import claudeService, { AI_PERSONALITIES } from '@/services/claudeService';
import elevenLabsService, { ELEVEN_LABS_VOICES } from '@/services/elevenLabsService';
import { conversationsManager } from '@/lib/supabase';
import { ScrollArea } from '@/components/ui/scroll-area';
import useRealtimeSubscription from '@/hooks/useRealtimeSubscription';

type AIColleague = {
  id: string;
  name: string;
  role: string;
  avatar_url: string | null;
  personality: string;
  voice_id: string | null;
};

type Message = {
  id?: string;
  conversation_id?: string;
  sender_type: 'user' | 'ai';
  content: string;
  created_at?: string;
  audio_url?: string;
};

export default function WorkspacePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentColleague, setCurrentColleague] = useState<AIColleague | null>(null);
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [audioCaching, setAudioCaching] = useState<Record<string, string>>({});
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Use our realtime subscription hook for messages
  const { data: messages, setData: setMessages } = useRealtimeSubscription<Message>(
    'messages',
    [],
    currentConversation ? { conversation_id: currentConversation } : undefined
  );
  
  // Define some demo AI colleagues
  const sampleColleagues: AIColleague[] = [
    {
      id: 'colleague-1',
      name: 'Maya Chen',
      role: 'Senior Product Manager',
      avatar_url: null,
      personality: AI_PERSONALITIES.SUPPORTIVE_MENTOR,
      voice_id: ELEVEN_LABS_VOICES.MENTOR_FEMALE.voice_id,
    },
    {
      id: 'colleague-2',
      name: 'Marcus Johnson',
      role: 'Technical Lead',
      avatar_url: null,
      personality: AI_PERSONALITIES.TECHNICAL_EXPERT,
      voice_id: ELEVEN_LABS_VOICES.MENTOR_MALE.voice_id,
    },
    {
      id: 'colleague-3',
      name: 'Sophia Rodriguez',
      role: 'UX/UI Designer',
      avatar_url: null,
      personality: AI_PERSONALITIES.CREATIVE_COLLABORATOR,
      voice_id: ELEVEN_LABS_VOICES.INTERVIEWER_FEMALE.voice_id,
    },
  ];
  
  // Load user conversations
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
  }, [user]);
  
  // Auto scroll to bottom of messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle colleague selection
  const selectColleague = (colleague: AIColleague) => {
    setCurrentColleague(colleague);
    setCurrentConversation(null);
    setMessages([]);
  };
  
  // Start a new conversation
  const startNewConversation = async () => {
    if (!user || !currentColleague) return;
    
    try {
      setIsLoading(true);
      
      // Create a new conversation title
      const title = `Chat with ${currentColleague.name}`;
      const initialMessage = `Hello ${currentColleague.name}, I'd like to discuss some work scenarios with you.`;
      
      // Use the conversation manager to create a new conversation
      const result = await claudeService.createConversation(
        user.id,
        currentColleague.id,
        title,
        initialMessage
      );
      
      // Update UI
      setCurrentConversation(result.conversation.id);
      setMessages(result.messages);
      
      // Update conversations list
      setConversations(prev => [result.conversation, ...prev]);
      
      // Generate audio for AI response if voice is available
      if (currentColleague.voice_id) {
        try {
          const aiMessage = result.messages.find(m => m.sender_type === 'ai');
          if (aiMessage) {
            const audioUrl = await elevenLabsService.generateVoiceSample(
              aiMessage.content,
              currentColleague.voice_id
            );
            
            // Cache the audio URL
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
  
  // Load existing conversation
  const loadConversation = async (conversationId: string) => {
    try {
      setIsLoading(true);
      
      // Find the conversation in our list
      const conversation = conversations.find(c => c.id === conversationId);
      if (!conversation) return;
      
      // Find the AI colleague associated with this conversation
      const colleague = sampleColleagues.find(c => c.id === conversation.ai_colleague_id);
      if (!colleague) return;
      
      // Set current colleague and conversation
      setCurrentColleague(colleague);
      setCurrentConversation(conversationId);
      
      // Load messages for this conversation
      const conversationMessages = await conversationsManager.getConversationMessages(conversationId);
      setMessages(conversationMessages);
      
      // Generate audio URLs for AI messages that haven't been cached yet
      if (colleague.voice_id) {
        const aiMessages = conversationMessages.filter(m => m.sender_type === 'ai');
        
        for (const msg of aiMessages) {
          // Only generate audio if we haven't cached it yet
          if (!audioCaching[msg.content]) {
            try {
              const audioUrl = await elevenLabsService.generateVoiceSample(
                msg.content,
                colleague.voice_id
              );
              
              // Cache the audio URL
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
  
  // Send a message
  const sendMessage = async () => {
    if (!message.trim() || !currentConversation || !user) return;
    
    try {
      setIsLoading(true);
      
      // Add user message to UI immediately for better UX
      const userMessage: Message = {
        sender_type: 'user',
        content: message,
        created_at: new Date().toISOString(),
      };
      
      setMessages([...messages, userMessage]);
      
      // Clear input
      setMessage('');
      
      // Send to API and get AI response
      const aiMessage = await claudeService.addMessageToConversation(
        currentConversation,
        message
      );
      
      // Generate audio for AI response if voice is available
      if (currentColleague?.voice_id) {
        try {
          const audioUrl = await elevenLabsService.generateVoiceSample(
            aiMessage.content,
            currentColleague.voice_id
          );
          
          // Cache the audio URL
          setAudioCaching(prev => ({
            ...prev,
            [aiMessage.content]: audioUrl,
          }));
        } catch (audioError) {
          console.error("Error generating audio:", audioError);
        }
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Failed to send your message",
        variant: "destructive",
      });
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get initials for avatar
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
          Interact with AI colleagues on realistic tasks and scenarios.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* AI Colleagues List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>AI Colleagues</CardTitle>
            <CardDescription>
              Select a colleague to work with on tasks and scenarios.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {sampleColleagues.map((colleague) => (
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

        {/* Chat / Workspace Area */}
        <Card className="lg:col-span-3">
          {!currentColleague ? (
            <div className="flex flex-col items-center justify-center h-[500px] p-6">
              <Bot size={64} className="text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Select an AI Colleague</h2>
              <p className="text-muted-foreground text-center mb-6">
                Choose a colleague from the list to start a conversation or continue an existing one.
              </p>
            </div>
          ) : !currentConversation ? (
            <div className="flex flex-col items-center justify-center h-[500px] p-6">
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
                            <PenLine className="mr-2 h-4 w-4" />
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
              <CardHeader className="border-b">
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
              </CardHeader>
              <ScrollArea className="h-[400px] p-4">
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div 
                      key={msg.id || i} 
                      className={`flex ${msg.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`
                          max-w-[80%] rounded-lg p-3 
                          ${msg.sender_type === 'user' 
                            ? 'bg-primary text-primary-foreground ml-4' 
                            : 'bg-muted mr-4'
                          }
                        `}
                      >
                        <div className="flex items-start">
                          {msg.sender_type === 'ai' && (
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={currentColleague.avatar_url || undefined} />
                              <AvatarFallback>{getInitials(currentColleague.name)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <div className="whitespace-pre-wrap">{msg.content}</div>
                            
                            {/* Show voice player for AI messages if we have audio */}
                            {msg.sender_type === 'ai' && audioCaching[msg.content] && (
                              <div className="mt-2">
                                <VoicePlayer 
                                  audioUrl={audioCaching[msg.content]} 
                                  showWaveform={false}
                                />
                              </div>
                            )}
                          </div>
                          {msg.sender_type === 'user' && (
                            <Avatar className="h-8 w-8 ml-2">
                              <AvatarImage src={user?.profile?.avatar_url || undefined} />
                              <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
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
                    disabled={isLoading}
                  />
                  <Button 
                    size="icon" 
                    onClick={sendMessage}
                    disabled={isLoading || !message.trim()}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
