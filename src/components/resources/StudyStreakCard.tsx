
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Clock, Calendar, Trophy } from 'lucide-react';

interface StudyActivity {
  date: string;
  minutes: number;
}

interface StudyStreakCardProps {
  currentStreak: number;
  longestStreak: number;
  totalHours: number;
  lastSevenDays: StudyActivity[];
}

const StudyStreakCard: React.FC<StudyStreakCardProps> = ({ 
  currentStreak, 
  longestStreak, 
  totalHours,
  lastSevenDays
}) => {
  // Calculate intensity for each day (for heatmap visualization)
  const maxMinutes = Math.max(...lastSevenDays.map(day => day.minutes));
  
  // Get day names for the last 7 days
  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Flame className="h-5 w-5 mr-2 text-amber-500" />
          Learning Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Flame className="h-4 w-4 mr-1 text-amber-500" />
              <span className="text-sm text-muted-foreground">Current</span>
            </div>
            <div className="text-2xl font-bold">{currentStreak}</div>
            <div className="text-xs text-muted-foreground">days</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Trophy className="h-4 w-4 mr-1 text-amber-500" />
              <span className="text-sm text-muted-foreground">Longest</span>
            </div>
            <div className="text-2xl font-bold">{longestStreak}</div>
            <div className="text-xs text-muted-foreground">days</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="h-4 w-4 mr-1 text-blue-500" />
              <span className="text-sm text-muted-foreground">Total</span>
            </div>
            <div className="text-2xl font-bold">{totalHours}</div>
            <div className="text-xs text-muted-foreground">hours</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Last 7 Days
            </h3>
            <Badge variant="outline" className="text-xs">
              {lastSevenDays.reduce((total, day) => total + day.minutes, 0)} min
            </Badge>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {lastSevenDays.map((day, index) => (
              <div key={day.date} className="text-center">
                <div 
                  className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center text-xs
                    ${day.minutes === 0 
                      ? 'bg-muted/30 text-muted-foreground' 
                      : day.minutes < maxMinutes / 3
                        ? 'bg-amber-100 text-amber-800'
                        : day.minutes < (maxMinutes * 2) / 3  
                          ? 'bg-amber-200 text-amber-800'
                          : 'bg-amber-300 text-amber-900'
                    }`}
                >
                  {day.minutes > 0 ? Math.round(day.minutes / 60 * 10) / 10 : 0}
                </div>
                <div className="text-xs mt-1 text-muted-foreground">
                  {getDayName(day.date)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyStreakCard;
