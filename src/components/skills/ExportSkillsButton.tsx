
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import exportService from '@/services/exportService';

interface ExportSkillsButtonProps {
  skills: any[];
  className?: string;
}

export function ExportSkillsButton({ skills, className }: ExportSkillsButtonProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to export skills data",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsExporting(true);
      await exportService.exportSkillsAsCSV(user.id, skills);
      
      toast({
        title: "Export Successful",
        description: "Your skills report has been downloaded",
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : "Failed to export skills data",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className={className}
      onClick={handleExport}
      disabled={isExporting || !skills || skills.length === 0}
    >
      <FileDown className="mr-2 h-4 w-4" />
      Export Skills CSV
    </Button>
  );
}

export default ExportSkillsButton;
