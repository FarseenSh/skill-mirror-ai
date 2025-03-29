
// Claude API service for AI colleague interactions
import { supabase } from '@/integrations/supabase/client';
import { aiColleaguesManager, conversationsManager } from '@/lib/supabase';

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
      // For now, we'll simulate responses since we need API key
      console.log("Claude API would process:", { messages, systemPrompt, model });
      
      // Get the last message
      const lastMessage = messages[messages.length - 1];
      
      // For simulation purposes, let's generate some helpful responses
      let response = "I'm your AI colleague. I'd be happy to help with that!";
      
      if (lastMessage.content.toLowerCase().includes("interview")) {
        response = "Let's prepare for your interview. Can you tell me what position you're applying for and what areas you'd like to focus on?";
      } else if (lastMessage.content.toLowerCase().includes("skill")) {
        response = "Developing new skills is crucial for career growth. What specific skills are you looking to improve, and what's your current level of proficiency?";
      } else if (lastMessage.content.toLowerCase().includes("project")) {
        response = "Let's discuss your project. What are the main goals and challenges you're facing? I can help you create a structured plan to tackle it effectively.";
      } else if (lastMessage.content.toLowerCase().includes("feedback")) {
        response = "I'd be happy to give you feedback. Could you share more details about what you're working on? The more specific you are, the more helpful I can be.";
      }
      
      return response;
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
      const aiColleague = await aiColleaguesManager.getColleagueById(aiColleagueId);

      // Create a new conversation
      const conversation = await conversationsManager.createConversation({
        user_id: userId,
        ai_colleague_id: aiColleagueId,
        title,
      });

      // Generate system prompt based on AI colleague personality
      const systemPrompt = `${aiColleague.personality} Your name is ${aiColleague.name} and your role is ${aiColleague.role}.`;

      // Generate AI response to initial message
      const aiResponse = await claudeService.generateResponse(
        [{ role: 'user', content: initialMessage }],
        systemPrompt
      );

      // Save the user message
      await conversationsManager.addMessage({
        conversation_id: conversation.id,
        sender_type: 'user',
        content: initialMessage,
      });

      // Save the AI response
      await conversationsManager.addMessage({
        conversation_id: conversation.id,
        sender_type: 'ai',
        content: aiResponse,
      });

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
        await conversationsManager.addMessage({
          conversation_id: conversationId,
          sender_type: 'user',
          content: message,
        });

        // Get conversation details and AI colleague
        const { data: conversation } = await supabase
          .from('conversations')
          .select('*, ai_colleagues(*)')
          .eq('id', conversationId)
          .single();

        // Get previous messages for context
        const previousMessages = await conversationsManager.getConversationMessages(conversationId);

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
        const savedResponse = await conversationsManager.addMessage({
          conversation_id: conversationId,
          sender_type: 'ai',
          content: aiResponse,
        });

        return savedResponse;
      } else {
        // If it's an AI message (manual insertion)
        const data = await conversationsManager.addMessage({
          conversation_id: conversationId,
          sender_type: 'ai',
          content: message,
        });

        return data;
      }
    } catch (error) {
      console.error('Error adding message to conversation:', error);
      throw error;
    }
  },
};

export default claudeService;
