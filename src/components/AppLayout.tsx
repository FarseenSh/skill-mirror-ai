
import { useState } from "react";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { AppTopBar } from "@/components/AppTopBar";
import { useAuth } from "@/components/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { GlobalKeyboardShortcuts } from '@/components/GlobalKeyboardShortcuts';
import { Logo } from "@/components/Logo";
import { AppSidebar } from "@/components/AppSidebar";

export default function AppLayout() {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Logo size="lg" className="animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <GlobalKeyboardShortcuts />
      <SidebarProvider>
        <div className="flex h-screen antialiased text-foreground bg-background w-full">
          <AppSidebar />
          <div className="flex-1 flex-col">
            <AppTopBar />
            <main className="flex-1 pt-6 px-4 md:px-8">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
