import { useParams, useNavigate } from "react-router-dom";
import { procedures } from "@/data/seed";
import { formatCurrency } from "@/lib/matching";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, IndianRupee, Stethoscope, ArrowRight, Activity, Users } from "lucide-react";

function recoveryDifficulty(weeks: number): { label: string; color: string } {
  if (weeks <= 4) return { label: "Mild", color: "text-trust" };
  if (weeks <= 8) return { label: "Moderate", color: "text-warning" };
  return { label: "Intensive", color: "text-destructive" };
}

export default function TreatmentInfo() {
  const { procedureId } = useParams<{ procedureId: string }>();
  const navigate = useNavigate();
  const proc = procedures.find((p) => p.id === procedureId);

  if (!proc) return <div className="p-8 text-center text-muted-foreground">Procedure not found.</div>;

  const difficulty = recoveryDifficulty(proc.recoveryWeeks);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-2 text-sm font-medium text-accent">{proc.specialty}</div>
          <h1 className="mb-4 font-display text-3xl font-bold text-foreground">{proc.name}</h1>
          <p className="mb-8 text-muted-foreground leading-relaxed">{proc.description}</p>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <IndianRupee className="mb-2 h-5 w-5 text-primary" />
              <p className="text-xs text-muted-foreground">Expected Cost Range</p>
              <p className="mt-1 font-display text-lg font-bold text-foreground">
                {formatCurrency(proc.avgCostMin)} – {formatCurrency(proc.avgCostMax)}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <Clock className="mb-2 h-5 w-5 text-primary" />
              <p className="text-xs text-muted-foreground">Recovery Timeline</p>
              <p className="mt-1 font-display text-lg font-bold text-foreground">{proc.recoveryWeeks} weeks</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <Activity className="mb-2 h-5 w-5 text-primary" />
              <p className="text-xs text-muted-foreground">Recovery Difficulty</p>
              <p className={`mt-1 font-display text-lg font-bold ${difficulty.color}`}>{difficulty.label}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <Stethoscope className="mb-2 h-5 w-5 text-primary" />
              <p className="text-xs text-muted-foreground">Specialty</p>
              <p className="mt-1 font-display text-lg font-bold text-foreground">{proc.specialty}</p>
            </div>
          </div>

          {/* Questions to ask */}
          <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-card">
            <h2 className="mb-4 font-display text-xl font-bold text-foreground">Questions to Ask Your Hospital</h2>
            <ol className="space-y-3">
              {proc.questions.map((q, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                  {q}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate(`/insights/${proc.id}`)} variant="outline" size="lg">
              <Users className="mr-2 h-4 w-4" /> Patients Like You
            </Button>
            <Button onClick={() => navigate(`/compare/${proc.id}`)} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Compare Hospitals <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
