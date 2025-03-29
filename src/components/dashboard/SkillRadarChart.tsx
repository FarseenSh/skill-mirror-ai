
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skill } from '@/data/skillsData';

interface SkillRadarChartProps {
  skills: Skill[];
  targetRole?: {
    name: string;
    skills: {
      name: string;
      required: number;
    }[];
  };
}

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ skills, targetRole }) => {
  // Group skills by category and calculate average proficiency
  const categoryAverages = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = { 
        values: [], 
        target: 0 
      };
    }
    
    acc[skill.category].values.push(skill.proficiency);
    
    // Find matching target skill if available
    if (targetRole) {
      const targetSkill = targetRole.skills.find(t => t.name.toLowerCase() === skill.name.toLowerCase());
      if (targetSkill) {
        acc[skill.category].target += targetSkill.required;
      }
    }
    
    return acc;
  }, {} as Record<string, { values: number[], target: number }>);
  
  // Calculate average for each category
  const radarData = Object.entries(categoryAverages).map(([category, data]) => {
    const average = data.values.reduce((sum, val) => sum + val, 0) / data.values.length;
    const targetAverage = targetRole 
      ? (data.target / (data.values.length || 1))
      : 0;
      
    return {
      category,
      proficiency: Math.round(average),
      required: targetAverage > 0 ? Math.round(targetAverage) : undefined
    };
  });

  const chartConfig = {
    proficiency: {
      label: "Your Proficiency",
      color: "#8b5cf6", // Purple
    },
    required: {
      label: "Role Requirement",
      color: "#f97316", // Orange
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Skill Category Overview
          {targetRole && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              vs {targetRole.name}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                  name="Proficiency"
                  dataKey="proficiency"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                />
                {targetRole && (
                  <Radar
                    name="Required"
                    dataKey="required"
                    stroke="#f97316"
                    fill="#f97316"
                    fillOpacity={0.2}
                  />
                )}
                <Tooltip content={<ChartTooltipContent />} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillRadarChart;
