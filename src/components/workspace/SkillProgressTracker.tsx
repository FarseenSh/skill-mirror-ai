
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Star, Award } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  targetProficiency: number;
  recentImprovement?: boolean;
}

interface SkillProgressTrackerProps {
  skills: Skill[];
}

export const SkillProgressTracker: React.FC<SkillProgressTrackerProps> = ({ skills }) => {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'programming':
        return 'bg-blue-100 text-blue-800';
      case 'design':
        return 'bg-purple-100 text-purple-800';
      case 'communication':
        return 'bg-green-100 text-green-800';
      case 'leadership':
        return 'bg-amber-100 text-amber-800';
      case 'problem solving':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency < 20) return 'Beginner';
    if (proficiency < 40) return 'Novice';
    if (proficiency < 60) return 'Intermediate';
    if (proficiency < 80) return 'Advanced';
    return 'Expert';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{skill.name}</span>
                  {skill.recentImprovement && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <ArrowUp className="h-3 w-3 mr-1" /> Improving
                    </Badge>
                  )}
                </div>
                <Badge className={getCategoryColor(skill.category)}>
                  {skill.category}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={skill.proficiency} className="h-2" />
                <span className="text-xs text-muted-foreground min-w-[60px] text-right">
                  {skill.proficiency}% - {getProficiencyLabel(skill.proficiency)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Current</span>
                <div className="flex items-center">
                  <span>Target: {skill.targetProficiency}%</span>
                  {skill.proficiency >= skill.targetProficiency && (
                    <Award className="h-3 w-3 ml-1 text-amber-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillProgressTracker;
