
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

// ElevenLabs Service - Currently simulated without actual API key
export const elevenLabsService = {
  // Convert text to speech (simulated for now)
  textToSpeech: async (
    text: string, 
    voiceId: string = ELEVEN_LABS_VOICES.MENTOR_MALE.voice_id,
    modelId: string = ELEVEN_LABS_MODELS.MULTILINGUAL
  ): Promise<Blob> => {
    try {
      console.log(`Simulating ElevenLabs API call with text: "${text.substring(0, 50)}..." and voice: ${voiceId}`);
      
      // Create a simple audio blob for testing (1 second of silence)
      const audioContext = new AudioContext();
      const sampleRate = audioContext.sampleRate;
      const buffer = audioContext.createBuffer(1, sampleRate, sampleRate);
      const channelData = buffer.getChannelData(0);
      
      // Fill with silence
      for (let i = 0; i < channelData.length; i++) {
        channelData[i] = 0;
      }
      
      // Convert to WAV
      const offlineContext = new OfflineAudioContext(1, sampleRate, sampleRate);
      const source = offlineContext.createBufferSource();
      source.buffer = buffer;
      source.connect(offlineContext.destination);
      source.start();
      
      const renderedBuffer = await offlineContext.startRendering();
      
      // Convert buffer to WAV format
      const wavBlob = new Blob([new Uint8Array(0)], { type: 'audio/wav' });
      
      return wavBlob;
    } catch (error) {
      console.error('Error generating speech from ElevenLabs (simulated):', error);
      throw error;
    }
  },

  // Generate a voice sample (simulated for now)
  generateVoiceSample: async (
    text: string,
    voiceId: string
  ): Promise<string> => {
    try {
      console.log(`Simulating voice sample generation for: "${text.substring(0, 50)}..."`);
      
      // In a real implementation, we would call the textToSpeech method
      // For now, return a dummy audio URL
      return 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
    } catch (error) {
      console.error('Error generating voice sample (simulated):', error);
      throw error;
    }
  }
};

export default elevenLabsService;
