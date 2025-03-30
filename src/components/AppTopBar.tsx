
import { User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/components/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { KeyboardShortcutsHelp } from "@/components/KeyboardShortcutsHelp";
import { CommandPalette } from "@/components/CommandPalette";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";

export function AppTopBar() {
  const { user, signOut } = useAuth();

  return (
    <>
      <CommandPalette />
      <div className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4">
        <div className="flex items-center gap-4 ml-0 md:ml-4">
          <SidebarTrigger />
          <Link to="/app/dashboard" className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="font-semibold hidden sm:inline">SkillMirror</span>
          </Link>
          <Button variant="outline" size="sm" className="hidden md:flex items-center text-muted-foreground">
            <Search className="mr-2 h-4 w-4" />
            <span>Search...</span>
            <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>
        <div className="flex items-center gap-4 mr-0 md:mr-4">
          <KeyboardShortcutsHelp />
          <NotificationCenter />
          <ThemeToggle variant="dropdown" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
