
import { cn } from "@/lib/utils";
import { CSSProperties } from "react";
import { SkillMirrorLogo } from "./SkillMirrorLogo";

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
      {/* SVG Logo */}
      <SkillMirrorLogo width={size === "sm" ? 32 : size === "md" ? 40 : 48} height={size === "sm" ? 32 : size === "md" ? 40 : 48} />
    </div>
  );
};

export default Logo;
