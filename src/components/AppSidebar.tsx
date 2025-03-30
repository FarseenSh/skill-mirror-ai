
import { Link, useLocation } from "react-router-dom";
import {
  Briefcase,
  BrainCircuit,
  LayoutDashboard,
  BookOpen,
  Compass,
  MessageSquare,
  LogOut,
  Settings,
  Home,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";

export function AppSidebar() {
  const location = useLocation();
  const { signOut } = useAuth();

  const mainNavItems = [
    {
      title: "Workspace",
      path: "/app/workspace",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Skills Dashboard",
      path: "/app/skills",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Projects Board",
      path: "/app/projects",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      title: "Learning Resources",
      path: "/app/resources",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Career Paths",
      path: "/app/career-paths",
      icon: <Compass className="h-5 w-5" />,
    },
    {
      title: "Interview Practice",
      path: "/app/interview-practice",
      icon: <MessageSquare className="h-5 w-5" />,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar>
      <SidebarHeader className="flex h-14 items-center border-b px-4">
        <div className="text-sm font-medium">
          Current Simulation: <span className="text-skill-purple">Software Engineer</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/"
                    className={`nav-link ${isActive("/") ? "nav-link-active" : ""}`}
                  >
                    <Home className="h-5 w-5" />
                    <span>Back to Landing</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.path}
                      className={`nav-link ${isActive(item.path) ? "nav-link-active" : ""}`}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex flex-col gap-2">
          <Link to="/app/settings" className="nav-link">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
          <Button
            variant="ghost"
            className="justify-start px-3"
            onClick={signOut}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
