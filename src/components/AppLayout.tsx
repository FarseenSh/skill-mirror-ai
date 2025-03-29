import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { AppTopBar } from "@/components/AppTopBar";
import { useAuth } from "@/components/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { GlobalKeyboardShortcuts } from '@/components/GlobalKeyboardShortcuts';

export default function AppLayout() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <GlobalKeyboardShortcuts />
      <div className="flex h-screen antialiased text-foreground bg-background">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 flex-col">
          <AppTopBar />
          <main className="flex-1 pt-6 px-4 md:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
