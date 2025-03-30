
import React from 'react';

interface SkillMirrorLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const SkillMirrorLogo: React.FC<SkillMirrorLogoProps> = ({ 
  width = 120, 
  height = 120,
  className = '' 
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4361ee" />
          <stop offset="100%" stopColor="#7209b7" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Main rounded square */}
      <rect x="10" y="10" width="100" height="100" rx="20" fill="url(#logoGradient)" />
      
      {/* Glow effect on edges */}
      <rect x="15" y="15" width="90" height="90" rx="15" 
        stroke="white" strokeOpacity="0.2" strokeWidth="2" fill="none" />
      
      {/* Shine effect */}
      <path d="M10 30L110 30" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
      
      {/* SM Letters */}
      <g filter="url(#glow)">
        <path d="M33 45C33 43.3431 34.3431 42 36 42H46C47.6569 42 49 43.3431 49 45V48C49 49.6569 47.6569 51 46 51H36C34.3431 51 33 49.6569 33 48V45Z" fill="white" />
        <path d="M55 45C55 43.3431 56.3431 42 58 42H68C69.6569 42 71 43.3431 71 45V48C71 49.6569 69.6569 51 68 51H58C56.3431 51 55 49.6569 55 48V45Z" fill="white" />
        <path d="M33 57C33 55.3431 34.3431 54 36 54H46C47.6569 54 49 55.3431 49 57V60C49 61.6569 47.6569 63 46 63H36C34.3431 63 33 61.6569 33 60V57Z" fill="white" />
        <path d="M55 57C55 55.3431 56.3431 54 58 54H68C69.6569 54 71 55.3431 71 57V60C71 61.6569 69.6569 63 68 63H58C56.3431 63 55 61.6569 55 60V57Z" fill="white" />
        <path d="M33 69C33 67.3431 34.3431 66 36 66H46C47.6569 66 49 67.3431 49 69V72C49 73.6569 47.6569 75 46 75H36C34.3431 75 33 73.6569 33 72V69Z" fill="white" />
        <path d="M55 69C55 67.3431 56.3431 66 58 66H68C69.6569 66 71 67.3431 71 69V72C71 73.6569 69.6569 75 68 75H58C56.3431 75 55 73.6569 55 72V69Z" fill="white" />
        
        {/* Connect lines */}
        <path d="M39 51V54" stroke="white" strokeWidth="6" strokeLinecap="round" />
        <path d="M61 51V54" stroke="white" strokeWidth="6" strokeLinecap="round" />
        <path d="M39 63V66" stroke="white" strokeWidth="6" strokeLinecap="round" />
        <path d="M61 63V66" stroke="white" strokeWidth="6" strokeLinecap="round" />
      </g>
      
      {/* Reflection */}
      <rect x="15" y="15" width="65" height="15" rx="5" fill="white" fillOpacity="0.1" />
    </svg>
  );
};

export default SkillMirrorLogo;
