
import { Outlet } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AuthLayout() {
  return (
    <div className="min-h-screen">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Outlet />
    </div>
  );
}
