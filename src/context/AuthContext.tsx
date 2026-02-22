import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { DecisionFile, Lead, HospitalResponse } from "@/data/seed";

type UserRole = "patient" | "hospital" | "admin";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string, role?: UserRole) => boolean;
  logout: () => void;
  decisions: DecisionFile[];
  saveDecision: (d: DecisionFile) => void;
  leads: Lead[];
  createLead: (l: Lead) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  hospitalResponses: HospitalResponse[];
  createHospitalResponse: (r: HospitalResponse) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("tw_user");
    return stored ? JSON.parse(stored) : null;
  });

  const [decisions, setDecisions] = useState<DecisionFile[]>(() => {
    const stored = localStorage.getItem("tw_decisions");
    return stored ? JSON.parse(stored) : [];
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const stored = localStorage.getItem("tw_leads");
    return stored ? JSON.parse(stored) : [];
  });

  const [hospitalResponses, setHospitalResponses] = useState<HospitalResponse[]>(() => {
    const stored = localStorage.getItem("tw_hospital_responses");
    return stored ? JSON.parse(stored) : [];
  });

  const signup = useCallback((name: string, email: string, _password: string, role: UserRole = "patient") => {
    const u: AuthUser = { id: crypto.randomUUID(), name, email, role };
    setUser(u);
    localStorage.setItem("tw_user", JSON.stringify(u));
    const users = JSON.parse(localStorage.getItem("tw_users") || "[]");
    users.push({ ...u, passwordHash: btoa(_password) });
    localStorage.setItem("tw_users", JSON.stringify(users));
    return true;
  }, []);

  const login = useCallback((email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("tw_users") || "[]");
    const found = users.find((u: any) => u.email === email && atob(u.passwordHash) === password);
    if (found) {
      const u: AuthUser = { id: found.id, name: found.name, email: found.email, role: found.role || "patient" };
      setUser(u);
      localStorage.setItem("tw_user", JSON.stringify(u));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("tw_user");
  }, []);

  const saveDecision = useCallback((d: DecisionFile) => {
    setDecisions((prev) => {
      const next = [d, ...prev];
      localStorage.setItem("tw_decisions", JSON.stringify(next));
      return next;
    });
  }, []);

  const createLead = useCallback((l: Lead) => {
    setLeads((prev) => {
      const next = [l, ...prev];
      localStorage.setItem("tw_leads", JSON.stringify(next));
      return next;
    });
  }, []);

  const updateLead = useCallback((id: string, updates: Partial<Lead>) => {
    setLeads((prev) => {
      const next = prev.map((l) => (l.id === id ? { ...l, ...updates } : l));
      localStorage.setItem("tw_leads", JSON.stringify(next));
      return next;
    });
  }, []);

  const createHospitalResponse = useCallback((r: HospitalResponse) => {
    setHospitalResponses((prev) => {
      const next = [r, ...prev];
      localStorage.setItem("tw_hospital_responses", JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, decisions, saveDecision, leads, createLead, updateLead, hospitalResponses, createHospitalResponse }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
