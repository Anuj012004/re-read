import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/authContext";
import { Loader2 } from "lucide-react";
import type { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Checking authentication...</span>
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
