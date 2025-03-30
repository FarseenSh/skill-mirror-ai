
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/components/AuthProvider";

export interface ChatMessage {
  id: string;
  sender: {
    name: string;
    role?: string;
    avatar?: string;
    isUser?: boolean;
  };
  content: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  isTyping?: boolean;
}

interface TeamChatProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

export const TeamChat: React.FC<TeamChatProps> = ({
  messages,
  onSendMessage
}) => {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b pb-3 flex flex-row items-center">
        <CardTitle className="text-base">Team Communication</CardTitle>
      </CardHeader>
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex ${message.sender.isUser ? 'flex-row-reverse' : 'flex-row'} gap-2 max-w-[80%]`}>
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src={message.sender.avatar} />
                  <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center mb-1 gap-2">
                    <span className="text-sm font-medium">{message.sender.name}</span>
                    {message.sender.role && (
                      <Badge variant="outline" className="text-xs">
                        {message.sender.role}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  </div>
                  
                  {message.isTyping ? (
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  ) : (
                    <div className={`p-3 rounded-lg ${message.sender.isUser ? 'bg-blue-600 text-white' : 'bg-muted'}`}>
                      {message.content}
                    </div>
                  )}
                  
                  {message.sender.isUser && message.status && (
                    <div className="text-xs text-right mt-1 text-muted-foreground">
                      {message.status === 'sending' && 'Sending...'}
                      {message.status === 'sent' && 'Sent'}
                      {message.status === 'delivered' && 'Delivered'}
                      {message.status === 'read' && 'Read'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="p-4 border-t mt-auto">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type your message..."
            className="min-h-10"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
