
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface SuccessCelebrationProps {
  title: string;
  message: string;
  type?: 'achievement' | 'levelUp' | 'projectComplete';
  onClose: () => void;
}

export function SuccessCelebration({ 
  title, 
  message, 
  type = 'achievement',
  onClose 
}: SuccessCelebrationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a slight delay before showing for better effect
    const timer = setTimeout(() => {
      setIsVisible(true);
      fireCelebration();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const fireCelebration = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleClose = () => {
    setIsVisible(false);
    // Add a small delay before fully removing from DOM
    setTimeout(onClose, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'levelUp':
        return <Award className="h-12 w-12 text-accent" />;
      case 'projectComplete':
        return <Trophy className="h-12 w-12 text-primary" />;
      default:
        return <Trophy className="h-12 w-12 text-accent" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card 
        className={`max-w-md w-full shadow-lg transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <CardHeader className="text-center pb-0">
          <div className="w-full flex justify-center mb-2">
            <div className="p-3 rounded-full bg-muted inline-flex">
              {getIcon()}
            </div>
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center pt-4">
          <p>{message}</p>

          <div className="mt-6 flex justify-center space-x-2">
            <div className="animate-bounce delay-100 w-3 h-3 rounded-full bg-primary"></div>
            <div className="animate-bounce delay-200 w-3 h-3 rounded-full bg-secondary"></div>
            <div className="animate-bounce delay-300 w-3 h-3 rounded-full bg-accent"></div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleClose}>Continue</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
