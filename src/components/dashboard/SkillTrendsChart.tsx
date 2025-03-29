
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// This would typically come from an API with historical skill data
const generateMockTrendData = (skillId: string, startValue: number, months = 6) => {
  const result = [];
  let currentValue = startValue - (Math.random() * 15 + 5); // Start a bit lower than current

  // Don't go below 10% as starting point
  if (currentValue < 10) currentValue = 10;
  
  for (let i = months; i >= 0; i--) {
    const month = new Date();
    month.setMonth(month.getMonth() - i);
    
    // Generate small improvements each month (1-8%)
    if (i < months) {
      currentValue += Math.random() * 8 + 1;
      if (currentValue > 100) currentValue = 100;
    }
    
    result.push({
      month: month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      proficiency: Math.round(currentValue)
    });
  }
  
  return result;
};

interface SkillTrendsChartProps {
  skillId: string;
  name: string;
  currentProficiency: number;
}

const SkillTrendsChart: React.FC<SkillTrendsChartProps> = ({ 
  skillId, 
  name, 
  currentProficiency 
}) => {
  const data = React.useMemo(() => 
    generateMockTrendData(skillId, currentProficiency), 
    [skillId, currentProficiency]
  );

  const chartConfig = {
    proficiency: {
      label: "Skill Proficiency",
      color: "#8b5cf6", // Purple
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Growth Trend: {name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="proficiency" 
                  stroke="#8b5cf6" 
                  strokeWidth={2} 
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillTrendsChart;
