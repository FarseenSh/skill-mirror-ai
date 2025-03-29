
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skill } from '@/data/skillsData';
import { Award, ArrowUpRight, Star, Trophy, Clock, Zap, BookOpen } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SkillAchievementsProps {
  skills: Skill[];
}

interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  date?: string;
}

const SkillAchievements: React.FC<SkillAchievementsProps> = ({ skills }) => {
  const achievements: AchievementBadge[] = React.useMemo(() => {
    const result: AchievementBadge[] = [];
    
    // Add achievement badges based on skill profiles
    const expertSkills = skills.filter(s => s.proficiency >= 80);
    if (expertSkills.length > 0) {
      result.push({
        id: 'expert-skills',
        name: 'Tech Expert',
        description: `Achieved expert-level proficiency in ${expertSkills.length} skill${expertSkills.length > 1 ? 's' : ''}`,
        icon: <Trophy className="h-4 w-4" />,
        unlocked: true,
        date: '2023-05-15'
      });
    }
    
    // Check for skills meeting or exceeding their targets
    const achievedTargets = skills.filter(s => s.proficiency >= s.targetProficiency);
    if (achievedTargets.length > 0) {
      result.push({
        id: 'target-achieved',
        name: 'Goal Achiever',
        description: `Reached target proficiency in ${achievedTargets.length} skill${achievedTargets.length > 1 ? 's' : ''}`,
        icon: <Star className="h-4 w-4" />,
        unlocked: true,
        date: '2023-06-22'
      });
    }
    
    // Check for recently improved skills
    const improvedSkills = skills.filter(s => s.recentImprovement);
    if (improvedSkills.length > 0) {
      result.push({
        id: 'fast-learner',
        name: 'Fast Learner',
        description: `Recently improved ${improvedSkills.length} skill${improvedSkills.length > 1 ? 's' : ''}`,
        icon: <Zap className="h-4 w-4" />,
        unlocked: true,
        date: '2023-08-03'
      });
    }
    
    // Add more achievement types
    result.push({
      id: 'consistent-practice',
      name: 'Consistent Practice',
      description: 'Practiced skills for 30 consecutive days',
      icon: <Clock className="h-4 w-4" />,
      unlocked: true,
      date: '2023-07-10'
    });
    
    result.push({
      id: 'diverse-skills',
      name: 'Renaissance Developer',
      description: 'Developed skills across 4+ different categories',
      icon: <BookOpen className="h-4 w-4" />,
      unlocked: skills.reduce((categories, skill) => {
        categories.add(skill.category);
        return categories;
      }, new Set()).size >= 4,
      date: '2023-04-18'
    });
    
    // Add some locked achievements for aspirational goals
    result.push({
      id: 'tech-leader',
      name: 'Tech Leader',
      description: 'Reached expert level (90%+) in at least 5 skills',
      icon: <Award className="h-4 w-4" />,
      unlocked: skills.filter(s => s.proficiency >= 90).length >= 5,
      date: skills.filter(s => s.proficiency >= 90).length >= 5 ? '2023-09-01' : undefined
    });
    
    return result;
  }, [skills]);

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Skill Achievements</span>
          <Badge variant="outline" className="text-xs">
            {unlockedAchievements.length}/{achievements.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-3">Unlocked</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {unlockedAchievements.map(achievement => (
                <TooltipProvider key={achievement.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="border rounded-lg p-3 flex items-center gap-2 hover:bg-muted/50 transition-colors cursor-help">
                        <div className="bg-primary/10 p-2 rounded-full text-primary">
                          {achievement.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{achievement.name}</p>
                          {achievement.date && (
                            <p className="text-xs text-muted-foreground">
                              {new Date(achievement.date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{achievement.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
          
          {lockedAchievements.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Locked</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {lockedAchievements.map(achievement => (
                  <TooltipProvider key={achievement.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="border border-dashed rounded-lg p-3 flex items-center gap-2 hover:bg-muted/30 transition-colors opacity-60 cursor-help">
                          <div className="bg-muted p-2 rounded-full text-muted-foreground">
                            {achievement.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{achievement.name}</p>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{achievement.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillAchievements;
