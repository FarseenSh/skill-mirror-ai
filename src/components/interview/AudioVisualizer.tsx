
import { useEffect, useRef } from "react";

interface AudioVisualizerProps {
  isPlaying: boolean;
}

export function AudioVisualizer({ isPlaying }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let particles: { x: number; y: number; radius: number; color: string; speed: number }[] = [];
    
    // Create particles
    const createParticles = () => {
      particles = [];
      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height / 2,
          radius: Math.random() * 3 + 1,
          color: `hsl(${210 + Math.random() * 50}, 80%, 60%)`,
          speed: Math.random() * 0.5 + 0.2
        });
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw center line
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.strokeStyle = "#e2e8f0";
      ctx.stroke();
      
      // Only animate particles if audio is playing
      if (isPlaying) {
        particles.forEach(particle => {
          // Random wave motion
          const amplitude = Math.random() * 20 + 5;
          particle.y = canvas.height / 2 + Math.sin(Date.now() * 0.001 + particle.x * 0.1) * amplitude;
          
          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
          
          // Move particle
          particle.x += particle.speed;
          
          // Reset if off screen
          if (particle.x > canvas.width) {
            particle.x = 0;
          }
        });
      } else {
        // Draw static particles along center line
        particles.forEach(particle => {
          ctx.beginPath();
          ctx.arc(particle.x, canvas.height / 2, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = "#94a3b8";
          ctx.fill();
        });
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = 60;
      createParticles();
    };
    
    // Initialize
    resizeCanvas();
    animate();
    
    window.addEventListener("resize", resizeCanvas);
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);
  
  return (
    <div className="w-full h-[60px] bg-muted/30 rounded-md overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
