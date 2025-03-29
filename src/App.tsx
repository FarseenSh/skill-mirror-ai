
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { useAuth } from "@/components/AuthProvider";

// Landing Page
import LandingPage from "@/pages/LandingPage";

// Auth Pages
import AuthLayout from "@/pages/auth/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import SignUpPage from "@/pages/auth/SignUpPage";

// App Pages
import AppLayout from "@/components/AppLayout";
import DashboardPage from "@/pages/app/DashboardPage";
import WorkspacePage from "@/pages/app/WorkspacePage";
import SkillsDashboardPage from "@/pages/app/SkillsDashboardPage";
import ProjectsPage from "@/pages/app/ProjectsPage";
import ResourcesPage from "@/pages/app/ResourcesPage";
import CareerPathsPage from "@/pages/app/CareerPathsPage";
import InterviewPracticePage from "@/pages/app/InterviewPracticePage";
import SettingsPage from "@/pages/app/SettingsPage";

// 404 Page
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />

              {/* Auth routes */}
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignUpPage />} />
              </Route>

              {/* Protected app routes */}
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="workspace" element={<WorkspacePage />} />
                <Route path="skills-dashboard" element={<SkillsDashboardPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="resources" element={<ResourcesPage />} />
                <Route path="career-paths" element={<CareerPathsPage />} />
                <Route path="interview-practice" element={<InterviewPracticePage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* 404 - Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
