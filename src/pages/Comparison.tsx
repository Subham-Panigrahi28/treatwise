import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { procedures, hospitals } from "@/data/seed";
import { rankHospitals, generateConfidence, formatCurrency } from "@/lib/matching";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HospitalCard } from "@/components/HospitalCard";
import { ConfidenceScore } from "@/components/ConfidenceScore";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Save, FileDown, Phone, CheckCircle2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { DecisionFile, Lead } from "@/data/seed";

export default function Comparison() {
  const { procedureId } = useParams<{ procedureId: string }>();
  const navigate = useNavigate();
  const { user, saveDecision, createLead } = useAuth();
  const { toast } = useToast();
  const [saved, setSaved] = useState(false);
  const [connectedHospitals, setConnectedHospitals] = useState<Set<string>>(new Set());

  const proc = procedures.find((p) => p.id === procedureId);
  if (!proc) return <div className="p-8 text-center text-muted-foreground">Procedure not found.</div>;

  const rankings = rankHospitals(proc.id);
  const confidence = generateConfidence(rankings);

  // City average cost
  const avgCityMin = proc.avgCostMin;
  const avgCityMax = proc.avgCostMax;

  const handleSave = () => {
    if (!user) return;
    const decision: DecisionFile = {
      id: crypto.randomUUID(),
      userId: user.id,
      procedureId: proc.id,
      confidenceScore: confidence.score,
      hospitalRankings: rankings,
      createdAt: new Date().toISOString(),
    };
    saveDecision(decision);
    setSaved(true);
    toast({ title: "Decision saved!", description: "You can revisit it from My Decisions." });
  };

  const handleConnect = (hospitalId: string) => {
    if (!user) return;
    const lead: Lead = {
      id: crypto.randomUUID(),
      userId: user.id,
      hospitalId,
      procedureId: proc.id,
      confidenceScore: confidence.score,
      leadStage: "new",
      createdAt: new Date().toISOString(),
    };
    createLead(lead);
    setConnectedHospitals((prev) => new Set(prev).add(hospitalId));
    const hosp = hospitals.find((h) => h.id === hospitalId);
    toast({ title: "Connection requested!", description: `${hosp?.name} is reviewing your case.` });
  };

  const handleExport = () => {
    const lines = [
      `TREATWISE DECISION FILE`,
      `Generated: ${new Date().toLocaleDateString()}`,
      `Procedure: ${proc.name}`,
      `Confidence Score: ${confidence.score}/100`,
      ``,
      `HOSPITAL RANKINGS:`,
      ...rankings.map((r, i) => `${i + 1}. ${r.hospital.name} — Score: ${r.score.toFixed(1)} — Cost: ₹${r.procedure.costMin.toLocaleString()}–₹${r.procedure.costMax.toLocaleString()}`),
      ``,
      `CONFIDENCE REASONING:`,
      ...confidence.bullets.map((b) => `• ${b}`),
      ``,
      `QUESTIONS TO ASK:`,
      ...proc.questions.map((q, i) => `${i + 1}. ${q}`),
      ``,
      `Disclaimer: TreatWise provides informational comparisons only. Consult a qualified healthcare provider.`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `treatwise-decision-${proc.name.toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported!", description: "Decision file downloaded." });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-2 text-sm font-medium text-accent">{proc.specialty} • {proc.city}</div>
          <h1 className="mb-4 font-display text-3xl font-bold text-foreground">Hospital Comparison: {proc.name}</h1>

          {/* City average banner */}
          <div className="mb-8 flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-4">
            <Users className="h-5 w-5 text-primary" />
            <div className="text-sm text-muted-foreground">
              <strong className="text-foreground">City Average:</strong> {formatCurrency(avgCityMin)} – {formatCurrency(avgCityMax)} for {proc.name} in {proc.city}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Hospital cards */}
            <div className="space-y-4 lg:col-span-2">
              {rankings.map((r, i) => (
                <div key={r.hospital.id}>
                  <HospitalCard ranked={r} rank={i + 1} />
                  <div className="mt-2 flex justify-end">
                    {connectedHospitals.has(r.hospital.id) ? (
                      <span className="flex items-center gap-1.5 text-sm text-trust font-medium">
                        <CheckCircle2 className="h-4 w-4" /> Hospital reviewing your case…
                      </span>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => handleConnect(r.hospital.id)}>
                        <Phone className="mr-1.5 h-3.5 w-3.5" /> Connect with Hospital
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ConfidenceScore score={confidence.score} bullets={confidence.bullets} />

              <div className="flex flex-col gap-3">
                <Button onClick={handleSave} disabled={saved} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  {saved ? "Saved ✓" : "Save Decision"}
                </Button>
                <Button variant="outline" onClick={handleExport} className="w-full">
                  <FileDown className="mr-2 h-4 w-4" />
                  Export Decision File
                </Button>
                <Button variant="ghost" onClick={() => navigate(`/insights/${proc.id}`)} className="w-full text-primary">
                  <Users className="mr-2 h-4 w-4" /> Patients Like You
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
