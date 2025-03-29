
import { Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShareAchievement } from "@/components/dashboard/ShareAchievement";

interface SkillAchievementItemProps {
  id: string;
  title: string;
  description: string;
  date: string;
  unlocked: boolean;
  skill: string;
  onUnlock?: (id: string) => void;
}

export function SkillAchievementItem({
  id,
  title,
  description,
  date,
  unlocked,
  skill,
  onUnlock
}: SkillAchievementItemProps) {
  return (
    <div className={cn(
      "p-4 border rounded-lg transition-all",
      unlocked 
        ? "bg-primary/5 border-primary/20" 
        : "bg-muted/30 border-border opacity-70"
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-full",
            unlocked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
          )}>
            <Award className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-base">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        
        {unlocked ? (
          <ShareAchievement 
            achievement={{
              id,
              title,
              description,
              date,
              skill
            }}
          />
        ) : onUnlock ? (
          <button
            onClick={() => onUnlock(id)}
            className="px-3 py-1 text-xs bg-muted rounded-md hover:bg-muted/80 transition-colors"
          >
            Unlock
          </button>
        ) : null}
      </div>
      
      <div className="mt-3 text-xs text-muted-foreground">
        {unlocked 
          ? `Achieved on ${new Date(date).toLocaleDateString()}` 
          : "Not yet achieved"}
      </div>
    </div>
  );
}
