
// Claude API service for AI colleague interactions
import { supabase } from '@/lib/supabase';

// Types for Claude API
type MessageRole = 'user' | 'assistant' | 'system';

interface Message {
  role: MessageRole;
  content: string;
}

interface ClaudeRequestBody {
  model: string;
  messages: Message[];
  system?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  stream?: boolean;
}

interface ClaudeResponse {
  id: string;
  type: string;
  role: string;
  content: Array<{
    type: string;
    text: string;
  }>;
  model: string;
  stop_reason: string;
  stop_sequence: string | null;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

// Claude models
export const CLAUDE_MODELS = {
  CLAUDE_3_OPUS: 'claude-3-opus-20240229',
  CLAUDE_3_SONNET: 'claude-3-sonnet-20240229',
  CLAUDE_3_HAIKU: 'claude-3-haiku-20240307',
};

// System prompts for different AI colleague personalities
export const AI_PERSONALITIES = {
  SUPPORTIVE_MENTOR: 'You are a supportive mentor who gives constructive feedback and encouragement. You have years of experience in the industry and want to help the user grow professionally.',
  CHALLENGING_COACH: 'You are a challenging coach who pushes users to their limits. You are direct but fair, and your goal is to help the user excel by identifying areas of improvement.',
  TECHNICAL_EXPERT: 'You are a technical expert with deep knowledge in your field. You provide detailed, accurate information and can explain complex concepts clearly.',
  CREATIVE_COLLABORATOR: 'You are a creative collaborator who generates innovative ideas. You think outside the box and help users explore new possibilities.',
  INTERVIEWER: 'You are conducting a job interview. Ask challenging but fair questions related to the position, and evaluate the user\'s responses objectively.',
};

// API Configuration
const CLAUDE_API_KEY = 'your-claude-api-key';  // In production, this would be an environment variable
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

// Main Claude API Service
export const claudeService = {
  // Generate a response from Claude
  generateResponse: async (
    messages: Message[],
    systemPrompt: string = '',
    model: string = CLAUDE_MODELS.CLAUDE_3_HAIKU,
    temperature: number = 0.7
  ): Promise<string> => {
    try {
      const requestBody: ClaudeRequestBody = {
        model,
        messages,
        system: systemPrompt,
        max_tokens: 1000,
        temperature,
      };

      const response = await fetch(CLAUDE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
          'x-api-key': CLAUDE_API_KEY,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Claude API error: ${errorData.error?.message || response.statusText}`);
      }

      const data: ClaudeResponse = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error('Error generating response from Claude:', error);
      throw error;
    }
  },

  // Create a new conversation with context
  createConversation: async (
    userId: string,
    aiColleagueId: string,
    title: string,
    initialMessage: string
  ) => {
    try {
      // Get AI colleague details
      const { data: aiColleague, error: aiError } = await supabase
        .from('ai_colleagues')
        .select('*')
        .eq('id', aiColleagueId)
        .single();

      if (aiError) throw aiError;

      // Create a new conversation
      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .insert([{
          user_id: userId,
          ai_colleague_id: aiColleagueId,
          title,
        }])
        .select()
        .single();

      if (convError) throw convError;

      // Generate system prompt based on AI colleague personality
      const systemPrompt = `${aiColleague.personality} Your name is ${aiColleague.name} and your role is ${aiColleague.role}.`;

      // Generate AI response to initial message
      const aiResponse = await claudeService.generateResponse(
        [{ role: 'user', content: initialMessage }],
        systemPrompt
      );

      // Save the user message
      await supabase.from('messages').insert([{
        conversation_id: conversation.id,
        sender_type: 'user',
        content: initialMessage,
      }]);

      // Save the AI response
      await supabase.from('messages').insert([{
        conversation_id: conversation.id,
        sender_type: 'ai',
        content: aiResponse,
      }]);

      return {
        conversation,
        messages: [
          { sender_type: 'user', content: initialMessage },
          { sender_type: 'ai', content: aiResponse }
        ]
      };
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  },

  // Add a message to an existing conversation
  addMessageToConversation: async (
    conversationId: string,
    message: string,
    senderType: 'user' | 'ai' = 'user'
  ) => {
    try {
      if (senderType === 'user') {
        // Save the user message
        await supabase.from('messages').insert([{
          conversation_id: conversationId,
          sender_type: 'user',
          content: message,
        }]);

        // Get conversation details and AI colleague
        const { data: conversation, error: convError } = await supabase
          .from('conversations')
          .select('*, ai_colleagues(*)')
          .eq('id', conversationId)
          .single();

        if (convError) throw convError;

        // Get previous messages for context
        const { data: previousMessages, error: msgError } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: true })
          .limit(10);

        if (msgError) throw msgError;

        // Format messages for Claude API
        const formattedMessages: Message[] = previousMessages.map(msg => ({
          role: msg.sender_type === 'user' ? 'user' : 'assistant',
          content: msg.content
        }));

        // Add the new message if it's not already included
        if (formattedMessages[formattedMessages.length - 1].content !== message) {
          formattedMessages.push({ role: 'user', content: message });
        }

        // Generate system prompt based on AI colleague personality
        const aiColleague = conversation.ai_colleagues;
        const systemPrompt = `${aiColleague.personality} Your name is ${aiColleague.name} and your role is ${aiColleague.role}.`;

        // Generate AI response
        const aiResponse = await claudeService.generateResponse(
          formattedMessages,
          systemPrompt
        );

        // Save the AI response
        const { data: savedResponse, error: saveError } = await supabase
          .from('messages')
          .insert([{
            conversation_id: conversationId,
            sender_type: 'ai',
            content: aiResponse,
          }])
          .select()
          .single();

        if (saveError) throw saveError;

        return savedResponse;
      } else {
        // If it's an AI message (manual insertion)
        const { data, error } = await supabase
          .from('messages')
          .insert([{
            conversation_id: conversationId,
            sender_type: 'ai',
            content: message,
          }])
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    } catch (error) {
      console.error('Error adding message to conversation:', error);
      throw error;
    }
  },
};

export default claudeService;
