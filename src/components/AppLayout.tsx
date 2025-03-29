
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { AppTopBar } from "@/components/AppTopBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { WelcomeTour } from "@/components/onboarding/WelcomeTour";
import { useToast } from "@/hooks/use-toast";

export default function AppLayout() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Set up global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if the user is typing in an input field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // Theme toggle: Cmd+J or Ctrl+J
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        toast({
          title: `Theme switched to ${isDark ? 'dark' : 'light'} mode`,
          description: "Your preference has been saved.",
        });
      }

      // Navigation shortcuts using the "g" prefix
      if (e.key === 'g' && !e.metaKey && !e.ctrlKey) {
        // Wait for the next key press
        const navigationTimeout = setTimeout(() => {
          // Clear the listener if no second key is pressed
        }, 2000);

        const handleSecondKey = (e2: KeyboardEvent) => {
          clearTimeout(navigationTimeout);
          document.removeEventListener('keydown', handleSecondKey);

          switch (e2.key) {
            case 'd':
              navigate('/app/dashboard');
              break;
            case 's':
              navigate('/app/skills-dashboard');
              break;
            case 'p':
              navigate('/app/projects');
              break;
            case 'w':
              navigate('/app/workspace');
              break;
            case 'r':
              navigate('/app/resources');
              break;
            case ',':
              navigate('/app/settings');
              break;
          }
        };

        document.addEventListener('keydown', handleSecondKey, { once: true });
      }

      // Export shortcuts: Cmd+E followed by S or P
      if (e.key === 'e' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        
        const exportTimeout = setTimeout(() => {
          // Clear if no second key is pressed
        }, 2000);

        const handleExportKey = (e2: KeyboardEvent) => {
          clearTimeout(exportTimeout);
          document.removeEventListener('keydown', handleExportKey);

          if (e2.key === 's') {
            // Export skills
            toast({
              title: "Exporting skills",
              description: "Your skills report is being generated...",
            });
            
            setTimeout(() => {
              const dataStr = JSON.stringify({ skills: [{ name: 'React', proficiency: 85 }] }, null, 2);
              const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
              
              const linkElement = document.createElement('a');
              linkElement.setAttribute('href', dataUri);
              linkElement.setAttribute('download', 'skillmirror-skills.json');
              linkElement.click();
              
              toast({
                title: "Skills exported successfully",
                description: "Your skills report has been downloaded.",
              });
            }, 1000);
          } else if (e2.key === 'p') {
            // Export portfolio
            toast({
              title: "Exporting portfolio",
              description: "Your portfolio is being generated...",
            });
            
            setTimeout(() => {
              const dataStr = JSON.stringify({ projects: [{ title: 'Portfolio Website', status: 'completed' }] }, null, 2);
              const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
              
              const linkElement = document.createElement('a');
              linkElement.setAttribute('href', dataUri);
              linkElement.setAttribute('download', 'skillmirror-portfolio.json');
              linkElement.click();
              
              toast({
                title: "Portfolio exported successfully",
                description: "Your portfolio has been downloaded.",
              });
            }, 1000);
          }
        };

        document.addEventListener('keydown', handleExportKey, { once: true });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, toast]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <AppTopBar />
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
      <WelcomeTour />
    </SidebarProvider>
  );
}
