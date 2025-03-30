
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type ScrollAnimationProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  animation?: 'fade-up' | 'fade-in' | 'slide-in-right' | 'slide-in-left' | 'scale-in';
  delay?: number;
  runOnce?: boolean;
  initiallyVisible?: boolean;
};

export const ScrollAnimation = ({
  children,
  className,
  threshold = 0.1,
  animation = 'fade-up',
  delay = 0,
  runOnce = true,
  initiallyVisible = true
}: ScrollAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(initiallyVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (runOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!runOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, runOnce]);

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    
    switch (animation) {
      case 'fade-up':
        return 'animate-fade-up';
      case 'fade-in':
        return 'animate-fade-in';
      case 'slide-in-right':
        return 'animate-slide-in-right';
      case 'slide-in-left':
        return 'animate-slide-in-left';
      case 'scale-in':
        return 'animate-scale-in';
      default:
        return 'animate-fade-in';
    }
  };

  const getDelayClass = () => {
    if (delay === 0) return '';
    return `delay-${delay * 100}`;
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700',
        getAnimationClass(),
        getDelayClass(),
        className
      )}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
