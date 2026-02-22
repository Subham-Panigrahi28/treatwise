import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";

interface RoleGuardProps {
  role: "patient" | "hospital";
  children: ReactNode;
}

export function PatientGuard({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (!user || user.role !== "patient") return <Navigate to="/" replace />;
  return <>{children}</>;
}

export function HospitalGuard({ children }: { children: ReactNode }) {
  const hospitalId = localStorage.getItem("tw_hospital_user");
  if (!hospitalId) return <Navigate to="/hospital/login" replace />;
  return <>{children}</>;
}
