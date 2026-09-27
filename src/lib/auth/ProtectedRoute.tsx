import { useRouter } from "@tanstack/react-router";
import { useAuth } from "./AuthContext";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ProtectedRoute({ children, fallback }: Props) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      fallback ?? (
        <div className="flex min-h-screen items-center justify-center bg-[#f0ece4]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#4A7C6A] border-t-transparent animate-spin" />
            <p className="text-sm text-[#7a7470]">Loading...</p>
          </div>
        </div>
      )
    );
  }

  if (!isAuthenticated) {
    // Use navigate instead of Navigate component to avoid route type issues
    router.navigate({ to: "/login" as any }); // Will work once /login route is created
    return null;
  }

  return <>{children}</>;
}