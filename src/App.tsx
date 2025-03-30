
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Pages
import LandingPage from '@/pages/LandingPage';
import NotFound from '@/pages/NotFound';
import LoginPage from '@/pages/auth/LoginPage';
import SignUpPage from '@/pages/auth/SignUpPage';
import AuthLayout from '@/pages/auth/AuthLayout';
import AppLayout from '@/components/AppLayout';
import DashboardPage from '@/pages/app/DashboardPage';
import ProjectsPage from '@/pages/app/ProjectsPage';
import PortfolioPage from '@/pages/app/PortfolioPage';
import ResourcesPage from '@/pages/app/ResourcesPage';
import SettingsPage from '@/pages/app/SettingsPage';
import SkillsDashboardPage from '@/pages/app/SkillsDashboardPage';
import CareerPathsPage from '@/pages/app/CareerPathsPage';
import WorkspacePage from '@/pages/app/WorkspacePage';
import InterviewPracticePage from '@/pages/app/InterviewPracticePage';
import ProjectDetailsPage from '@/pages/app/ProjectDetailsPage';

// Create a React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="skill-mirror-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignUpPage />} />
              </Route>
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="projects/:projectId" element={<ProjectDetailsPage />} />
                <Route path="portfolio" element={<PortfolioPage />} />
                <Route path="resources" element={<ResourcesPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="skills" element={<SkillsDashboardPage />} />
                <Route path="career-paths" element={<CareerPathsPage />} />
                <Route path="workspace" element={<WorkspacePage />} />
                <Route path="interview-practice" element={<InterviewPracticePage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
