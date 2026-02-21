import { useParams, useNavigate } from "react-router-dom";
import { procedures, patientInsights } from "@/data/seed";
import { formatCurrency } from "@/lib/matching";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Users, IndianRupee, Clock, ThumbsUp, Building2, ArrowRight } from "lucide-react";

export default function Insights() {
  const { procedureId } = useParams<{ procedureId: string }>();
  const navigate = useNavigate();
  const proc = procedures.find((p) => p.id === procedureId);

  if (!proc) return <div className="p-8 text-center text-muted-foreground">Procedure not found.</div>;

  const insights = patientInsights.filter((i) => i.procedureId === procedureId);
  const avgCost = insights.reduce((s, i) => s + i.avgCost, 0) / insights.length;
  const avgRecovery = insights.reduce((s, i) => s + i.recoveryWeeks, 0) / insights.length;
  const avgSatisfaction = insights.reduce((s, i) => s + i.satisfactionScore, 0) / insights.length;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-2 text-sm font-medium text-accent">{proc.specialty}</div>
          <h1 className="mb-2 font-display text-3xl font-bold text-foreground">Patients Like You</h1>
          <p className="mb-8 text-muted-foreground">Aggregated insights from patients who underwent {proc.name} in {proc.city}.</p>

          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <IndianRupee className="mb-2 h-5 w-5 text-primary" />
              <p className="text-xs text-muted-foreground">Typical Cost</p>
              <p className="mt-1 font-display text-xl font-bold text-foreground">{formatCurrency(avgCost)}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <Clock className="mb-2 h-5 w-5 text-primary" />
              <p className="text-xs text-muted-foreground">Avg Recovery</p>
              <p className="mt-1 font-display text-xl font-bold text-foreground">{avgRecovery.toFixed(0)} weeks</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <ThumbsUp className="mb-2 h-5 w-5 text-trust" />
              <p className="text-xs text-muted-foreground">Satisfaction Level</p>
              <p className="mt-1 font-display text-xl font-bold text-foreground">{avgSatisfaction.toFixed(0)}/100</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <Building2 className="mb-2 h-5 w-5 text-primary" />
              <p className="text-xs text-muted-foreground">Common Hospital Type</p>
              <p className="mt-1 font-display text-xl font-bold text-foreground">{insights[0]?.commonHospitalType ?? "N/A"}</p>
            </div>
          </div>

          <h2 className="mb-4 font-display text-xl font-bold text-foreground">By Age Group</h2>
          <div className="mb-8 space-y-3">
            {insights.map((ins, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-card p-4 shadow-card">
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">{ins.ageGroup} years</span>
                </div>
                <div className="flex gap-6 text-sm text-muted-foreground">
                  <span>{formatCurrency(ins.avgCost)}</span>
                  <span>{ins.recoveryWeeks}w</span>
                  <span className="text-trust font-medium">{ins.satisfactionScore}%</span>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={() => navigate(`/compare/${proc.id}`)} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Compare Hospitals <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
