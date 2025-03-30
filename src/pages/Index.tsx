
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DisplayCardsDemo } from "@/components/ui/display-cards-demo";
import { 
  BrainCircuit, 
  BarChart, 
  Briefcase, 
  BookOpen, 
  Target,
  MessageSquare,
  ArrowRight
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/10">
      <div className="container max-w-5xl px-4 py-8 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <BrainCircuit className="h-16 w-16 text-primary" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to SkillMirror</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Your personal platform for tracking skills, managing projects, and accelerating your professional growth.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link to="/auth/login">
            <Button size="lg">
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/auth/signup">
            <Button variant="outline" size="lg">
              Create Account
            </Button>
          </Link>
        </div>
        
        {/* Display Cards Demo */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Featured Content</h2>
          <DisplayCardsDemo />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <BarChart className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Skill Analytics</h3>
            <p className="text-muted-foreground">
              Track your skills and see your growth over time with advanced analytics.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <Briefcase className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Project Management</h3>
            <p className="text-muted-foreground">
              Manage your projects and portfolio to showcase your accomplishments.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <BookOpen className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Learning Resources</h3>
            <p className="text-muted-foreground">
              Access curated learning resources to improve your skills.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <Target className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Career Paths</h3>
            <p className="text-muted-foreground">
              Explore and plan your career path with guidance and recommendations.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <MessageSquare className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Workspace</h3>
            <p className="text-muted-foreground">
              Collaborate with AI colleagues to improve your skills and work on tasks.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <BrainCircuit className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interview Practice</h3>
            <p className="text-muted-foreground">
              Practice interviews with AI and get feedback to improve your interview skills.
            </p>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Ready to take your skills to the next level?</h2>
          <p className="text-muted-foreground mb-6">
            Join SkillMirror today and start tracking your professional growth journey.
          </p>
          <Link to="/auth/signup">
            <Button size="lg">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      
      <footer className="w-full py-6 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SkillMirror. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
