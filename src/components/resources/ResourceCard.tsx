
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Book, Video, FileText, Code, ExternalLink, BookOpen, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'course' | 'exercise';
  url: string;
  category: string[];
  estimatedTime?: string;
  progress?: number;
  skillId?: string;
}

interface ResourceCardProps {
  resource: Resource;
  onStart: (id: string) => void;
  onContinue: (id: string) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onStart, onContinue }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'course':
        return <BookOpen className="h-4 w-4" />;
      case 'exercise':
        return <Code className="h-4 w-4" />;
      default:
        return <Book className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article':
        return 'bg-blue-100 text-blue-800';
      case 'video':
        return 'bg-purple-100 text-purple-800';
      case 'course':
        return 'bg-amber-100 text-amber-800';
      case 'exercise':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-1">
        <div className="flex justify-between items-start mb-3">
          <Badge className={getTypeColor(resource.type)}>
            <span className="flex items-center">
              {getTypeIcon(resource.type)}
              <span className="ml-1 capitalize">{resource.type}</span>
            </span>
          </Badge>
          {resource.estimatedTime && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {resource.estimatedTime}
            </Badge>
          )}
        </div>
        
        <h3 className="font-medium text-base mb-2">{resource.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{resource.description}</p>
        
        <div className="flex flex-wrap gap-1 mt-auto">
          {resource.category.map(cat => (
            <Badge key={cat} variant="outline" className="text-xs">
              {cat}
            </Badge>
          ))}
        </div>
        
        {resource.progress !== undefined && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{resource.progress}%</span>
            </div>
            <Progress value={resource.progress} className="h-1" />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        {resource.progress === undefined || resource.progress === 0 ? (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={() => onStart(resource.id)}
          >
            Start Learning
          </Button>
        ) : resource.progress === 100 ? (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => window.open(resource.url, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-1" /> 
            Review Again
          </Button>
        ) : (
          <Button 
            variant="default" 
            size="sm" 
            className="w-full" 
            onClick={() => onContinue(resource.id)}
          >
            Continue ({resource.progress}%)
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
