
"use client"

import * as React from "react";
import { useToast } from "@/hooks/use-toast";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark"; // The actual applied theme
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light",
};

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "skill-mirror-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(
    () => {
      if (typeof localStorage !== 'undefined') {
        return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
      }
      return defaultTheme;
    }
  );
  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">("light");
  const { toast } = useToast();

  // Function to apply theme to the document
  const applyTheme = (newTheme: Theme) => {
    if (typeof window === 'undefined') return "light";
    
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    // Determine the actual theme (light or dark)
    let resolvedTheme: "light" | "dark";
    
    if (newTheme === "system") {
      resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      resolvedTheme = newTheme;
    }

    root.classList.add(resolvedTheme);
    setResolvedTheme(resolvedTheme);

    // Add smooth transition to body when changing themes
    document.body.style.transition = "background-color 0.3s ease, color 0.3s ease";

    return resolvedTheme;
  };

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    applyTheme(theme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const value = {
    theme,
    resolvedTheme,
    setTheme: (newTheme: Theme) => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(storageKey, newTheme);
      }
      setTheme(newTheme);
      const resolvedTheme = applyTheme(newTheme);
      
      // Show toast notification when theme changes
      toast({
        title: `${resolvedTheme === "dark" ? "Dark" : "Light"} theme activated`,
        description: resolvedTheme === "dark" 
          ? "Switched to dark theme for reduced eye strain."
          : "Switched to light theme for better visibility.",
        duration: 1500,
      });
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
