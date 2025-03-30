
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const ELEVEN_LABS_API_URL = 'https://api.elevenlabs.io/v1';

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
    const ELEVEN_LABS_API_KEY = Deno.env.get('ELEVEN_LABS_API_KEY');
    
    if (!ELEVEN_LABS_API_KEY) {
      // Return base64 encoded silent audio if API key is missing
      return new Response(
        JSON.stringify({ 
          audio: 'UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=',
          format: 'mp3',
          message: 'Using simulated audio - ElevenLabs API key not configured'
        }),
        {
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

    const { text, voiceId, modelId } = body;

    if (!text) {
      throw new Error('Text is required');
    }

    if (!voiceId) {
      throw new Error('Voice ID is required');
    }

    // Attempt to call ElevenLabs API
    try {
      const requestBody = {
        text,
        model_id: modelId || 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        }
      };

      const response = await fetch(`${ELEVEN_LABS_API_URL}/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': ELEVEN_LABS_API_KEY,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('ElevenLabs API error response:', errorData);
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      // Get audio data as array buffer
      const audioArrayBuffer = await response.arrayBuffer();
      
      // Convert to base64 safely - using a more efficient approach
      const uint8Array = new Uint8Array(audioArrayBuffer);
      const chunks = [];
      const chunkSize = 1024;
      
      for (let i = 0; i < uint8Array.length; i += chunkSize) {
        chunks.push(String.fromCharCode.apply(null, uint8Array.slice(i, i + chunkSize)));
      }
      
      const base64Audio = btoa(chunks.join(''));

      return new Response(
        JSON.stringify({ 
          audio: base64Audio,
          format: 'mp3'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    } catch (apiError) {
      console.error('ElevenLabs API error:', apiError);
      
      // Return base64 encoded silent audio
      return new Response(
        JSON.stringify({ 
          audio: 'UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=',
          format: 'mp3',
          message: 'Using simulated audio - ElevenLabs API unavailable'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    console.error('Error in ElevenLabs API function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred processing your request',
        audio: 'UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=' // Silent audio
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
