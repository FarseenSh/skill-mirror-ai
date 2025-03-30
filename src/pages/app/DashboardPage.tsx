
import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, BookOpen, Briefcase, Compass, LineChart, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollAnimation } from "@/components/ScrollAnimation";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back!</h1>
        <p className="text-muted-foreground">
          Here's an overview of your professional development journey.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ScrollAnimation animation="fade-up" delay={0}>
          <Link to="/app/workspace" className="cursor-pointer">
            <Card className="dashboard-card hover:shadow-md transition-all duration-300 border-blue-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Workspace Simulation</CardTitle>
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Experience a real work environment</div>
                <div className="mt-3 flex items-center text-sm text-primary">
                  <span>Enter simulation</span>
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={1}>
          <Link to="/app/skills" className="cursor-pointer">
            <Card className="dashboard-card hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Skills Dashboard</CardTitle>
                <LineChart className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Track your skill development</div>
                <div className="mt-3 flex items-center text-sm text-primary">
                  <span>View progress</span>
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={2}>
          <Link to="/app/projects" className="cursor-pointer">
            <Card className="dashboard-card hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Projects Board</CardTitle>
                <Briefcase className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Manage work assignments</div>
                <div className="mt-3 flex items-center text-sm text-primary">
                  <span>View projects</span>
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={3}>
          <Link to="/app/resources" className="cursor-pointer">
            <Card className="dashboard-card hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Learning Resources</CardTitle>
                <BookOpen className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Access educational content</div>
                <div className="mt-3 flex items-center text-sm text-primary">
                  <span>Browse resources</span>
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={4}>
          <Link to="/app/career-paths" className="cursor-pointer">
            <Card className="dashboard-card hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Career Paths</CardTitle>
                <Compass className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Visualize career progression</div>
                <div className="mt-3 flex items-center text-sm text-primary">
                  <span>Explore paths</span>
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={5}>
          <Link to="/app/interview-practice" className="cursor-pointer">
            <Card className="dashboard-card hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Interview Practice</CardTitle>
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Prepare for job interviews</div>
                <div className="mt-3 flex items-center text-sm text-primary">
                  <span>Start practice</span>
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </ScrollAnimation>
      </div>
    </div>
  );
}
