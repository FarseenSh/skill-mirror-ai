
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TaskCardProps {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: string;
  dueTime?: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  priority,
  dueDate,
  dueTime
}) => {
  const getPriorityColor = () => {
    switch (priority) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground mr-2">Priority:</span>
            <Badge className={getPriorityColor()}>
              {priority}
            </Badge>
          </div>
          {(dueDate || dueTime) && (
            <div className="text-xs text-muted-foreground">
              Due: {dueDate} {dueTime}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
