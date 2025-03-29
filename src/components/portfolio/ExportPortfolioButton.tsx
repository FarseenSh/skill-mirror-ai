
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import exportService from '@/services/exportService';

interface ExportPortfolioButtonProps {
  portfolioData: any;
  className?: string;
}

export function ExportPortfolioButton({ portfolioData, className }: ExportPortfolioButtonProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to export portfolio data",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsExporting(true);
      await exportService.exportPortfolioAsPDF(user.id, portfolioData);
      
      toast({
        title: "Export Successful",
        description: "Your portfolio has been downloaded as PDF",
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : "Failed to export portfolio data",
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
      disabled={isExporting || !portfolioData}
    >
      <FileDown className="mr-2 h-4 w-4" />
      Export Portfolio PDF
    </Button>
  );
}

export default ExportPortfolioButton;
