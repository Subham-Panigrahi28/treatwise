import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { procedures } from "@/data/seed";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Calendar } from "lucide-react";

export default function Decisions() {
  const { user, decisions } = useAuth();
  const navigate = useNavigate();

  if (!user) { navigate("/login"); return null; }

  const userDecisions = decisions.filter((d) => d.userId === user.id);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-3xl px-4">
          <h1 className="mb-2 font-display text-3xl font-bold text-foreground">My Decisions</h1>
          <p className="mb-8 text-muted-foreground">Revisit your saved hospital comparisons.</p>

          {userDecisions.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-12 text-center shadow-card">
              <FileText className="mx-auto mb-4 h-10 w-10 text-muted-foreground/40" />
              <p className="mb-4 text-muted-foreground">No decisions saved yet.</p>
              <Button onClick={() => navigate("/dashboard")}>Upload a Prescription</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {userDecisions.map((d) => {
                const proc = procedures.find((p) => p.id === d.procedureId);
                return (
                  <div key={d.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover">
                    <div>
                      <h3 className="font-display font-bold text-foreground">{proc?.name ?? "Unknown"}</h3>
                      <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(d.createdAt).toLocaleDateString()}</span>
                        <span>Confidence: <strong className="text-foreground">{d.confidenceScore}/100</strong></span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/compare/${d.procedureId}`)}>
                      View <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
