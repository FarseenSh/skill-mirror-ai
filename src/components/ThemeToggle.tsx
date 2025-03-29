
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="transition-colors duration-300"
              >
                {resolvedTheme === "light" ? (
                  <Sun className="h-5 w-5 text-amber-500" />
                ) : (
                  <Moon className="h-5 w-5 text-indigo-400" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="animate-in slide-in-from-top-1">
              <DropdownMenuItem 
                onClick={() => setTheme("light")}
                className={theme === "light" ? "bg-accent" : ""}
              >
                <Sun className="mr-2 h-4 w-4 text-amber-500" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme("dark")}
                className={theme === "dark" ? "bg-accent" : ""}
              >
                <Moon className="mr-2 h-4 w-4 text-indigo-400" />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme("system")}
                className={theme === "system" ? "bg-accent" : ""}
              >
                <Monitor className="mr-2 h-4 w-4" />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent>
          <p>Change theme</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
