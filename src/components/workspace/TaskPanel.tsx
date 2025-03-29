
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Check, Clock, AlertCircle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

interface TaskPanelProps {
  tasks: Task[];
  onSelectTask: (taskId: string) => void;
  selectedTaskId?: string;
}

export const TaskPanel: React.FC<TaskPanelProps> = ({ 
  tasks, 
  onSelectTask, 
  selectedTaskId 
}) => {
  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case 'in_progress':
        return <Pencil className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'blocked':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'bg-muted text-muted-foreground';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-slate-100 text-slate-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Tasks</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div 
                key={task.id} 
                className={`p-4 cursor-pointer hover:bg-muted transition-colors ${
                  selectedTaskId === task.id ? 'bg-muted' : ''
                }`}
                onClick={() => onSelectTask(task.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{task.title}</h3>
                  <div className="flex gap-2">
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <Badge className={getStatusColor(task.status)}>
                      <span className="flex items-center">
                        {getStatusIcon(task.status)}
                        <span className="ml-1">{task.status.replace('_', ' ')}</span>
                      </span>
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                {task.dueDate && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No tasks available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskPanel;
