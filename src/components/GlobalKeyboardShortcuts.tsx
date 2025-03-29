
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/components/ThemeProvider';
import { useToast } from '@/hooks/use-toast';

export function GlobalKeyboardShortcuts() {
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if Command/Ctrl key is pressed
      if (!(e.metaKey || e.ctrlKey)) return;

      // Prevent default for our keyboard shortcuts
      const handleShortcut = () => {
        e.preventDefault();
      };

      switch (e.key) {
        case 'h': // Home/Dashboard
          handleShortcut();
          navigate('/app/dashboard');
          toast({
            title: "Navigation",
            description: "Navigated to Dashboard",
            duration: 1500,
          });
          break;
        
        case 'p': // Projects
          handleShortcut();
          navigate('/app/projects');
          toast({
            title: "Navigation",
            description: "Navigated to Projects",
            duration: 1500,
          });
          break;
        
        case 'w': // Workspace
          handleShortcut();
          navigate('/app/workspace');
          toast({
            title: "Navigation",
            description: "Navigated to Workspace",
            duration: 1500,
          });
          break;
        
        case 'i': // Interview Practice
          handleShortcut();
          navigate('/app/interview');
          toast({
            title: "Navigation",
            description: "Navigated to Interview Practice",
            duration: 1500,
          });
          break;
        
        case 's': // Settings
          handleShortcut();
          navigate('/app/settings');
          toast({
            title: "Navigation",
            description: "Navigated to Settings",
            duration: 1500,
          });
          break;
        
        case 'd': // Toggle dark/light mode
          handleShortcut();
          const newTheme = theme === 'dark' ? 'light' : 'dark';
          setTheme(newTheme);
          break;
        
        default:
          // No matching shortcut
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, theme, setTheme, toast]);

  return null; // This component does not render anything
}

export default GlobalKeyboardShortcuts;
