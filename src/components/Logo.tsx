
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "white";
  className?: string;
}

export const Logo = ({ size = "md", variant = "primary", className }: LogoProps) => {
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
    <div className={cn(
      "rounded-full flex items-center justify-center font-bold transition-all duration-300 shadow-md relative overflow-hidden",
      sizeClasses[size],
      variantClasses[variant],
      className
    )}>
      {/* Enhanced logo with glow effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-skill-blue/20 to-skill-purple/20 animate-pulse"></div>
      <span className="tracking-tight relative z-10">SM</span>
    </div>
  );
};

export default Logo;
