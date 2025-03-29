
// ElevenLabs voice API integration
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

// API Configuration
const ELEVEN_LABS_API_KEY = 'your-elevenlabs-api-key'; // In production, this would be an environment variable
const ELEVEN_LABS_API_URL = 'https://api.elevenlabs.io/v1';

// ElevenLabs Service
export const elevenLabsService = {
  // Convert text to speech
  textToSpeech: async (
    text: string, 
    voiceId: string = ELEVEN_LABS_VOICES.MENTOR_MALE.voice_id,
    modelId: string = ELEVEN_LABS_MODELS.MULTILINGUAL
  ): Promise<Blob> => {
    try {
      const requestBody: TextToSpeechRequest = {
        text,
        voice_id: voiceId,
        model_id: modelId,
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
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Error generating speech from ElevenLabs:', error);
      throw error;
    }
  },

  // Get available voices
  getVoices: async (): Promise<Voice[]> => {
    try {
      const response = await fetch(`${ELEVEN_LABS_API_URL}/voices`, {
        method: 'GET',
        headers: {
          'xi-api-key': ELEVEN_LABS_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.voices;
    } catch (error) {
      console.error('Error fetching voices from ElevenLabs:', error);
      throw error;
    }
  },

  // Generate a voice sample
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
