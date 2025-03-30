
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillImprovementProps {
  skillName: string;
  improvementPercentage: number;
  skillContext: string;
  onViewDashboard: () => void;
}

export const SkillImprovement: React.FC<SkillImprovementProps> = ({
  skillName,
  improvementPercentage,
  skillContext,
  onViewDashboard
}) => {
  return (
    <Card className="mt-4 border-green-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-green-100 p-1">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-medium flex items-center">
              Skill Improvement Detected
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your {skillName} skills have improved by {improvementPercentage}% based on {skillContext}.
            </p>
            <button 
              onClick={onViewDashboard}
              className="text-sm text-blue-600 hover:text-blue-800 mt-2 flex items-center"
            >
              View your updated skills dashboard 
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
