import { HospitalSidebar } from "@/components/HospitalSidebar";
import type { ReactNode } from "react";

export function HospitalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <HospitalSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
