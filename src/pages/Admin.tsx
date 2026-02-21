import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { hospitals, procedures } from "@/data/seed";
import type { Lead } from "@/data/seed";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, Calendar } from "lucide-react";

// Demo leads
const demoLeads: Lead[] = [
  { id: "lead-1", userId: "demo-user", hospitalId: "hosp-1", procedureId: "proc-1", confidenceScore: 88, leadStage: "new", createdAt: new Date().toISOString() },
  { id: "lead-2", userId: "demo-user", hospitalId: "hosp-3", procedureId: "proc-2", confidenceScore: 92, leadStage: "reviewing", createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "lead-3", userId: "demo-user", hospitalId: "hosp-2", procedureId: "proc-3", confidenceScore: 75, leadStage: "contacted", createdAt: new Date(Date.now() - 172800000).toISOString() },
];

const stageColors: Record<string, string> = {
  new: "bg-info text-info-foreground",
  reviewing: "bg-warning text-warning-foreground",
  contacted: "bg-trust text-trust-foreground",
  converted: "bg-primary text-primary-foreground",
};

export default function Admin() {
  const [leads] = useState<Lead[]>(demoLeads);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-5xl px-4">
          <h1 className="mb-2 font-display text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="mb-8 text-muted-foreground">Manage leads and hospital data.</p>

          <Tabs defaultValue="leads">
            <TabsList>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
            </TabsList>

            <TabsContent value="leads" className="mt-6">
              <div className="space-y-3">
                {leads.map((lead) => {
                  const hosp = hospitals.find((h) => h.id === lead.hospitalId);
                  const proc = procedures.find((p) => p.id === lead.procedureId);
                  return (
                    <div key={lead.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-card">
                      <div className="flex items-center gap-4">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{proc?.name ?? "Unknown"}</p>
                          <p className="text-sm text-muted-foreground">{hosp?.name} • Confidence: {lead.confidenceScore}/100</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" /> {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                        <Badge className={stageColors[lead.leadStage]}>{lead.leadStage}</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="hospitals" className="mt-6">
              <div className="space-y-3">
                {hospitals.map((h) => (
                  <div key={h.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-card">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">{h.name}</p>
                        <p className="text-sm text-muted-foreground">{h.city}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>Spec: {h.specializationScore}</span>
                      <span>Trans: {h.transparencyScore}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
