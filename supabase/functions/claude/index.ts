
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const CLAUDE_API_KEY = Deno.env.get('CLAUDE_API_KEY');
    
    if (!CLAUDE_API_KEY) {
      return new Response(
        JSON.stringify({ 
          content: [{ 
            type: 'text', 
            text: "I'm a simulated AI assistant. The actual Claude API key is not configured. In a real environment, I would process your message and respond accordingly." 
          }],
          role: 'assistant',
          id: 'simulated-response',
          model: 'claude-3-haiku-20240307',
          stop_reason: 'end_turn',
          type: 'message'
        }),
        {
          status: 200, // Return 200 to avoid breaking the frontend
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Parse request body safely
    let body;
    try {
      body = await req.json();
    } catch (e) {
      throw new Error('Invalid request body');
    }

    const { messages, systemPrompt, model, temperature } = body;

    // Attempt to call Claude API
    try {
      const requestBody = {
        model: model || 'claude-3-haiku-20240307',
        messages,
        system: systemPrompt || '',
        max_tokens: 1000,
        temperature: temperature || 0.7,
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

      const data = await response.json();
      
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (apiError) {
      console.error('Claude API error:', apiError);
      
      // Return a simulated response instead of failing
      return new Response(
        JSON.stringify({ 
          content: [{ 
            type: 'text', 
            text: "I'm a simulated AI assistant. The Claude API is currently unavailable or not configured correctly. In a real environment, I would process your message and respond with AI-generated content." 
          }],
          role: 'assistant',
          id: 'simulated-claude-response',
          model: 'claude-3-haiku-20240307',
          stop_reason: 'end_turn',
          type: 'message'
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    console.error('Error in Claude API function:', error);
    
    return new Response(
      JSON.stringify({ 
        content: [{ 
          type: 'text', 
          text: "I'm a simulated AI assistant. There was an error processing your request. In a real environment, I would provide a helpful response to your message." 
        }],
        role: 'assistant',
        id: 'error-simulated-response',
        model: 'claude-3-haiku-20240307',
        stop_reason: 'end_turn',
        type: 'message'
      }),
      {
        status: 200, // Return 200 to avoid breaking the frontend
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
