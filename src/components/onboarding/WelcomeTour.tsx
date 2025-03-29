
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { X, ChevronRight, ChevronLeft, LightbulbIcon, GraduationCap, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/AuthProvider";

interface TourStep {
  title: string;
  content: string;
  icon: React.ReactNode;
}

export function WelcomeTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  const tourSteps: TourStep[] = [
    {
      title: "Welcome to SkillMirror!",
      content: "Let's take a quick tour to help you get started with the platform. We'll show you how to track your skills, find projects, and achieve your career goals.",
      icon: <LightbulbIcon className="h-8 w-8 text-primary" />
    },
    {
      title: "Skills Dashboard",
      content: "Track your professional growth with our interactive Skills Dashboard. Monitor your progress, identify areas for improvement, and discover learning resources tailored to your needs.",
      icon: <GraduationCap className="h-8 w-8 text-primary" />
    },
    {
      title: "Project Recommendations",
      content: "Apply your skills to real-world projects that match your expertise and career goals. Complete projects to earn achievements and build a compelling portfolio.",
      icon: <Trophy className="h-8 w-8 text-primary" />
    }
  ];

  useEffect(() => {
    // Check if this is the user's first visit
    const hasSeenTour = localStorage.getItem('skillmirror_tour_completed');
    
    if (user && !hasSeenTour) {
      // Delay the tour slightly to let the page load first
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [user]);

  const completeTour = () => {
    setIsOpen(false);
    localStorage.setItem('skillmirror_tour_completed', 'true');
    
    toast({
      title: "Tour completed!",
      description: "You're all set to start your learning journey.",
    });
  };

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardHeader className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2"
            onClick={completeTour}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="mb-2 flex justify-center">
            {tourSteps[currentStep].icon}
          </div>
          <CardTitle className="text-center">
            {tourSteps[currentStep].title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            {tourSteps[currentStep].content}
          </p>
          
          <div className="flex justify-center mt-6 space-x-1">
            {tourSteps.map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? "w-6 bg-primary" 
                    : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentStep === tourSteps.length - 1 ? "Get Started" : "Next"}
            {currentStep !== tourSteps.length - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
