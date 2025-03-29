
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CommandDialog, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem,
  CommandSeparator
} from '@/components/ui/command';
import {
  Search,
  Keyboard,
  Settings,
  User,
  FileText,
  Share2,
  Download,
  BarChart,
  Briefcase,
  BookOpen,
  LogOut
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/AuthProvider';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut } = useAuth();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleExport = (type: 'skills' | 'portfolio') => {
    // This would typically connect to a backend service to generate reports
    // For now, we'll create a simple JSON export
    
    const exportData = type === 'skills' 
      ? { skills: [{ name: 'React', proficiency: 85 }, { name: 'TypeScript', proficiency: 80 }] }
      : { projects: [{ title: 'Portfolio Website', status: 'completed' }] };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = type === 'skills' ? 'skillmirror-skills.json' : 'skillmirror-portfolio.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: 'Export complete',
      description: `Your ${type} have been exported successfully.`,
    });
    
    setOpen(false);
  };

  const handleShare = (item: string) => {
    // In a real implementation, this would open a sharing dialog or create a shareable link
    
    // For now, we'll simulate copying a link to clipboard
    navigator.clipboard.writeText(`https://skillmirror.app/share/${item.toLowerCase().replace(/\s+/g, '-')}`);
    
    toast({
      title: 'Link copied to clipboard',
      description: `You can now share your ${item} with others.`,
    });
    
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => handleNavigate('/app/dashboard')}>
            <BarChart className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate('/app/skills-dashboard')}>
            <BarChart className="mr-2 h-4 w-4" />
            <span>Skills Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate('/app/projects')}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Projects</span>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate('/app/workspace')}>
            <User className="mr-2 h-4 w-4" />
            <span>Workspace</span>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate('/app/resources')}>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Learning Resources</span>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate('/app/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Export">
          <CommandItem onSelect={() => handleExport('skills')}>
            <Download className="mr-2 h-4 w-4" />
            <span>Export Skills Report</span>
          </CommandItem>
          <CommandItem onSelect={() => handleExport('portfolio')}>
            <Download className="mr-2 h-4 w-4" />
            <span>Export Portfolio</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Share">
          <CommandItem onSelect={() => handleShare('Skills Profile')}>
            <Share2 className="mr-2 h-4 w-4" />
            <span>Share Skills Profile</span>
          </CommandItem>
          <CommandItem onSelect={() => handleShare('Portfolio')}>
            <Share2 className="mr-2 h-4 w-4" />
            <span>Share Portfolio</span>
          </CommandItem>
          <CommandItem onSelect={() => handleShare('Achievement')}>
            <Share2 className="mr-2 h-4 w-4" />
            <span>Share Latest Achievement</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Account">
          <CommandItem onSelect={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
