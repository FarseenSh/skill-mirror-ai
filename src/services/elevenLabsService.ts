
// ElevenLabs voice API integration
import { supabase } from '@/integrations/supabase/client';

interface Voice {
  voice_id: string;
  name: string;
  gender: string;
  language: string;
}

interface TextToSpeechRequest {
  text: string;
  voice_id: string;
  model_id?: string;
  voice_settings?: {
    stability: number;
    similarity_boost: number;
  };
}

// Available voices
export const ELEVEN_LABS_VOICES: Record<string, Voice> = {
  INTERVIEWER_MALE: {
    voice_id: 'pNInz6obpgDQGcFmaJgB', // Adam
    name: 'Adam',
    gender: 'male',
    language: 'en-US'
  },
  INTERVIEWER_FEMALE: {
    voice_id: 'EXAVITQu4vr4xnSDxMaL', // Sarah
    name: 'Sarah',
    gender: 'female',
    language: 'en-US'
  },
  MENTOR_MALE: {
    voice_id: 'TX3LPaxmHKxFdv7VOQHJ', // Liam
    name: 'Liam',
    gender: 'male',
    language: 'en-US'
  },
  MENTOR_FEMALE: {
    voice_id: 'XB0fDUnXU5powFXDhCwa', // Charlotte
    name: 'Charlotte',
    gender: 'female',
    language: 'en-US'
  },
  COACH: {
    voice_id: 'onwK4e9ZLuTAKqWW03F9', // Daniel
    name: 'Daniel',
    gender: 'male',
    language: 'en-US'
  }
};

// Models
export const ELEVEN_LABS_MODELS = {
  MULTILINGUAL: 'eleven_multilingual_v2',
  TURBO: 'eleven_turbo_v2',
};

// ElevenLabs Service
export const elevenLabsService = {
  // Convert text to speech using ElevenLabs API
  textToSpeech: async (
    text: string, 
    voiceId: string = ELEVEN_LABS_VOICES.MENTOR_MALE.voice_id,
    modelId: string = ELEVEN_LABS_MODELS.MULTILINGUAL
  ): Promise<Blob> => {
    try {
      const { data, error } = await supabase.functions.invoke('elevenlabs', {
        body: { 
          text, 
          voiceId,
          modelId
        }
      });
      
      if (error) throw new Error(error.message || 'Error calling ElevenLabs API');
      
      // Convert base64 to blob
      const binaryString = atob(data.audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      return new Blob([bytes], { type: 'audio/mp3' });
    } catch (error) {
      console.error('Error generating speech from ElevenLabs:', error);
      throw error;
    }
  },

  // Generate a voice sample and return a playable URL
  generateVoiceSample: async (
    text: string,
    voiceId: string
  ): Promise<string> => {
    try {
      const audioBlob = await elevenLabsService.textToSpeech(text, voiceId);
      return URL.createObjectURL(audioBlob);
    } catch (error) {
      console.error('Error generating voice sample:', error);
      throw error;
    }
  }
};

export default elevenLabsService;
