
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VoicePlayer } from '@/components/VoicePlayer';
import { Check, CheckCheck, Clock } from 'lucide-react';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';

export interface ChatMessageProps {
  id: string;
  content: string;
  senderType: 'user' | 'ai' | 'system';
  senderName: string;
  senderAvatar?: string;
  timestamp: Date;
  audioUrl?: string;
  status?: MessageStatus;
}

const MessageStatusIndicator = ({ status }: { status?: MessageStatus }) => {
  if (!status || status === 'sending') {
    return <Clock className="h-3 w-3 text-muted-foreground" />;
  }
  
  if (status === 'sent') {
    return <Check className="h-3 w-3 text-muted-foreground" />;
  }
  
  if (status === 'delivered') {
    return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
  }
  
  if (status === 'read') {
    return <CheckCheck className="h-3 w-3 text-blue-500" />;
  }
  
  return null;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  senderType,
  senderName,
  senderAvatar,
  timestamp,
  audioUrl,
  status
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(timestamp);
  
  return (
    <div className={`flex ${senderType === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start max-w-[80%] ${senderType === 'user' ? 'flex-row-reverse' : ''}`}>
        <Avatar className={`h-8 w-8 ${senderType === 'user' ? 'ml-2' : 'mr-2'}`}>
          <AvatarImage src={senderAvatar} />
          <AvatarFallback>{getInitials(senderName)}</AvatarFallback>
        </Avatar>
        
        <div className={`
          rounded-lg p-3 
          ${senderType === 'user' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted'
          }
        `}>
          <div className="flex flex-col">
            <div className="whitespace-pre-wrap">{content}</div>
            
            {audioUrl && senderType === 'ai' && (
              <div className="mt-2">
                <VoicePlayer 
                  audioUrl={audioUrl} 
                  showWaveform={false}
                />
              </div>
            )}
            
            <div className={`flex text-xs mt-1 ${senderType === 'user' ? 'justify-end' : 'justify-start'}`}>
              <span className={`
                ${senderType === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}
              `}>
                {formattedTime}
              </span>
              
              {senderType === 'user' && status && (
                <span className="ml-1 flex items-center">
                  <MessageStatusIndicator status={status} />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
