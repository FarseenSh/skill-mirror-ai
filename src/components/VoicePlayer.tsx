
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface VoicePlayerProps {
  audioUrl: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
  className?: string;
  showWaveform?: boolean;
}

export const VoicePlayer = ({
  audioUrl,
  onPlayStateChange,
  className = '',
  showWaveform = true,
}: VoicePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [audioFrequencies, setAudioFrequencies] = useState<number[]>(Array(20).fill(0));
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  
  // Initialize audio
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
      onPlayStateChange?.(false);
    });
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [audioUrl, onPlayStateChange]);
  
  // Set up audio visualization
  useEffect(() => {
    if (!showWaveform) return;
    
    const setupAudioAnalyser = () => {
      if (!audioRef.current) return;
      
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;
      
      const audioSource = audioContext.createMediaElementSource(audioRef.current);
      audioSource.connect(analyser);
      analyser.connect(audioContext.destination);
    };
    
    if (audioRef.current && !analyserRef.current) {
      setupAudioAnalyser();
    }
  }, [audioRef, showWaveform]);
  
  // Update audio visualization
  const updateAudioVisualization = () => {
    if (!analyserRef.current) return;
    
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    analyserRef.current.getByteFrequencyData(dataArray);
    
    // Sample 20 frequency points for visualization
    const frequencies = Array.from({length: 20}, (_, i) => {
      const index = Math.floor(i * (bufferLength / 20));
      return dataArray[index] / 255; // Normalize to 0-1
    });
    
    setAudioFrequencies(frequencies);
    
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateAudioVisualization);
    }
  };
  
  // Handle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    } else {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(updateAudioVisualization);
      
      // Resume audio context if it was suspended (needed for Chrome)
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
    }
    
    setIsPlaying(!isPlaying);
    onPlayStateChange?.(!isPlaying);
  };
  
  // Update current time
  const whilePlaying = () => {
    if (!audioRef.current) return;
    
    setCurrentTime(audioRef.current.currentTime);
    animationRef.current = requestAnimationFrame(whilePlaying);
  };
  
  // Start time tracking when playing
  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [isPlaying]);
  
  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    if (!audioRef.current) return;
    
    const newVolume = value[0];
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };
  
  // Format time for display
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <div className={`flex flex-col p-4 rounded-lg bg-card border ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </Button>
        
        <div className="text-sm font-medium">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        
        <div className="flex items-center ml-auto gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </Button>
          <div className="w-20">
            <Slider 
              defaultValue={[0.75]} 
              max={1} 
              step={0.01} 
              value={[isMuted ? 0 : volume]}
              onValueChange={handleVolumeChange}
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
      
      {showWaveform && (
        <div className="flex items-end justify-between h-12 gap-[2px] mt-2">
          {audioFrequencies.map((freq, index) => (
            <div
              key={index}
              className="w-full bg-primary/60 rounded-sm transition-all duration-100"
              style={{
                height: `${Math.max(4, freq * 100)}%`,
                opacity: isPlaying ? 1 : 0.4
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VoicePlayer;
