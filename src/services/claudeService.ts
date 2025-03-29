
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
  TECH_LEAD_SARAH: `You are Sarah Chen, an experienced tech lead with 12+ years in software development. You have a calm, patient demeanor and excel at guiding developers through complex problems.

Key personality traits:
- Deeply knowledgeable about software architecture, testing, and best practices
- Prefers to guide others to solutions rather than giving answers directly
- Uses the Socratic method, asking thoughtful questions to help users find their own solutions
- Provides contextual explanations that connect immediate tasks to broader concepts
- Occasionally shares relevant personal experiences from your career to illustrate points
- Encouraging but honest - you don't shy away from pointing out potential issues
- Values clean, maintainable code and good documentation
- Has a slight preference for backend systems but is knowledgeable about full-stack development

When providing code feedback:
- First acknowledge what's working well
- Point out potential bugs or edge cases
- Suggest improvements for readability and maintainability
- Connect implementation details to broader architectural concerns
- Reference relevant design patterns or principles when applicable

Your tone is professional but conversational, and you often use analogies to explain complex concepts. You're also good at adapting your guidance based on the experience level of the developer you're mentoring.`,
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
      // Call the Claude edge function
      const { data, error } = await supabase.functions.invoke('claude', {
        body: { messages, systemPrompt, model, temperature }
      });
      
      if (error) throw new Error(error.message);
      
      // Extract the response text from the Claude API response
      const content = data.content[0].text;
      return content;
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

      // Save the user message
      await conversationsManager.addMessage({
        conversation_id: conversation.id,
        sender_type: 'user',
        content: initialMessage,
      });

      // Generate AI response to initial message
      const aiResponse = await claudeService.generateResponse(
        [{ role: 'user', content: initialMessage }],
        systemPrompt
      );

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
  
  // Add a workplace task context to a conversation
  addTaskContextToConversation: async (
    conversationId: string,
    taskId: string,
    taskTitle: string,
    taskDescription: string,
    taskCode?: string
  ) => {
    try {
      const contextMessage = `[SYSTEM: Adding task context for "${taskTitle}": ${taskDescription}]`;
      
      // If there's code associated with the task, include it in the context
      const fullContext = taskCode 
        ? `${contextMessage}\n\nHere's the code I'm working with:\n\`\`\`\n${taskCode}\n\`\`\``
        : contextMessage;
      
      // Add the context as a system message
      await conversationsManager.addMessage({
        conversation_id: conversationId,
        sender_type: 'system',
        content: fullContext,
      });
      
      return true;
    } catch (error) {
      console.error('Error adding task context to conversation:', error);
      throw error;
    }
  },
  
  // Analyze conversation for skill detection
  analyzeConversationForSkills: async (
    conversationId: string,
    userId: string
  ) => {
    try {
      // Get conversation messages
      const messages = await conversationsManager.getConversationMessages(conversationId);
      
      // Extract conversation content
      const conversationText = messages
        .map(msg => `${msg.sender_type}: ${msg.content}`)
        .join('\n\n');
      
      // Use Claude to analyze skills being demonstrated
      const analysisPrompt = `
        Based on the following conversation, identify the top 3 professional skills the user is demonstrating or developing.
        For each skill, provide a name, category (e.g., technical, communication, problem-solving), 
        and an estimated proficiency level (0-100).
        
        CONVERSATION:
        ${conversationText}
        
        FORMAT YOUR RESPONSE AS JSON:
        {
          "skills": [
            {
              "name": "skill name",
              "category": "skill category",
              "proficiency": numeric_value,
              "evidence": "brief explanation of the evidence"
            },
            ...
          ]
        }
      `;
      
      const analysis = await claudeService.generateResponse(
        [{ role: 'user', content: analysisPrompt }],
        AI_PERSONALITIES.TECHNICAL_EXPERT,
        CLAUDE_MODELS.CLAUDE_3_HAIKU,
        0.2 // Low temperature for more consistent output
      );
      
      try {
        const skillsData = JSON.parse(analysis);
        return skillsData.skills;
      } catch (parseError) {
        console.error('Error parsing skills analysis:', parseError);
        return [];
      }
    } catch (error) {
      console.error('Error analyzing conversation for skills:', error);
      return [];
    }
  }
};

export default claudeService;
