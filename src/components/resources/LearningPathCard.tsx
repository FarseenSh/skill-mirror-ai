
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Resource } from './ResourceCard';
import { BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  skillId: string;
  resources: Resource[];
  completedResources: number;
  totalResources: number;
}

interface LearningPathCardProps {
  path: LearningPath;
  onViewPath: (id: string) => void;
}

const LearningPathCard: React.FC<LearningPathCardProps> = ({ path, onViewPath }) => {
  const progress = path.totalResources > 0 
    ? (path.completedResources / path.totalResources) * 100 
    : 0;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-1">
          <Badge className="bg-indigo-100 text-indigo-800">Learning Path</Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {path.totalResources} resources
          </Badge>
        </div>
        <CardTitle className="text-lg">{path.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="py-2 flex-1">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{path.description}</p>
        
        <div className="space-y-4 mt-auto">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
                Completed
              </span>
              <span>{path.completedResources} of {path.totalResources}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {path.resources.slice(0, 2).map((resource) => (
            <div key={resource.id} className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 flex items-center justify-center">
                {resource.progress === 100 ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <div className={`w-2 h-2 rounded-full ${resource.progress && resource.progress > 0 ? 'bg-amber-500' : 'bg-muted'}`} />
                )}
              </div>
              <span className={`truncate ${resource.progress === 100 ? 'line-through text-muted-foreground' : ''}`}>
                {resource.title}
              </span>
            </div>
          ))}
          
          {path.resources.length > 2 && (
            <div className="text-sm text-muted-foreground pl-7">
              +{path.resources.length - 2} more resources
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          variant={progress === 100 ? "outline" : "default"} 
          size="sm" 
          className="w-full" 
          onClick={() => onViewPath(path.id)}
        >
          {progress === 100 ? 'View Complete Path' : 'Continue Learning'}
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LearningPathCard;
