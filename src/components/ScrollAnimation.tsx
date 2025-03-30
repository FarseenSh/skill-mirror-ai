
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type ScrollAnimationProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  animation?: 'fade-up' | 'fade-in' | 'slide-in-right' | 'slide-in-left' | 'scale-in' | 'rotate-in';
  delay?: number;
  duration?: 'faster' | 'fast' | 'normal' | 'slow' | 'slower';
  runOnce?: boolean;
  initiallyVisible?: boolean;
  offset?: number;
};

export const ScrollAnimation = ({
  children,
  className,
  threshold = 0.1,
  animation = 'fade-up',
  delay = 0,
  duration = 'normal',
  runOnce = true,
  initiallyVisible = false,
  offset = 0
}: ScrollAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(initiallyVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Add slight delay to create a staggered effect between elements
        setTimeout(() => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (runOnce && ref.current) {
              observer.unobserve(ref.current);
            }
          } else if (!runOnce) {
            setIsVisible(false);
          }
        }, offset);
      },
      { threshold, rootMargin: '10px' }
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
  }, [threshold, runOnce, offset]);

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
      case 'rotate-in':
        return 'animate-rotate-in';
      default:
        return 'animate-fade-in';
    }
  };

  const getDelayClass = () => {
    if (delay === 0) return '';
    return `delay-${delay * 100}`;
  };

  const getDurationClass = () => {
    switch (duration) {
      case 'faster':
        return 'animate-duration-faster';
      case 'fast':
        return 'animate-duration-fast';
      case 'normal':
        return 'animate-duration-normal';
      case 'slow':
        return 'animate-duration-slow';
      case 'slower':
        return 'animate-duration-slower';
      default:
        return 'animate-duration-normal';
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all',
        getAnimationClass(),
        getDelayClass(),
        getDurationClass(),
        className
      )}
      style={{ 
        visibility: isVisible ? 'visible' : 'hidden',
        transitionDelay: `${delay * 100}ms`
      }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
