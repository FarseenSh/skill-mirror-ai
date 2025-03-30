
import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "white";
  className?: string;
  style?: CSSProperties;
}

export const Logo = ({ size = "md", variant = "primary", className, style }: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg"
  };

  const variantClasses = {
    primary: "bg-gradient-to-br from-skill-blue to-skill-purple text-white",
    white: "bg-white text-skill-purple"
  };

  return (
    <div 
      className={cn(
        "rounded-lg flex items-center justify-center font-bold transition-all duration-300 shadow-lg relative overflow-hidden group",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      style={style}
    >
      {/* Enhanced 3D logo with improved effects */}
      <div className="absolute inset-0 bg-gradient-to-tr from-skill-blue/40 to-skill-purple/20 animate-pulse"></div>
      <div className="absolute -inset-1 bg-gradient-to-br from-skill-blue/60 to-skill-purple/60 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Left highlight */}
      <div className="absolute top-0 left-0 w-2 h-full bg-white/20 skew-x-12 transform -translate-x-2 group-hover:translate-x-12 transition-transform duration-700"></div>
      
      {/* Bottom reflection */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
      
      {/* 3D effect for the text */}
      <div className="relative z-10 flex items-center justify-center">
        <span className="tracking-tight font-bold text-white relative">
          <span className="absolute -top-[1px] -left-[1px] text-skill-lightBlue/50 blur-[0.5px]">SM</span>
          <span className="absolute -top-[0.5px] -left-[0.5px] text-white/70">SM</span>
          SM
        </span>
      </div>
    </div>
  );
};

export default Logo;
