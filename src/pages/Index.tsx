import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Shield, Upload, BarChart3, FileCheck, ArrowRight, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload Prescription", desc: "Upload your prescription image or PDF securely" },
  { icon: BarChart3, title: "Compare Hospitals", desc: "AI-powered ranking across cost, quality & transparency" },
  { icon: FileCheck, title: "Make Decisions", desc: "Get confidence scores and save your comparison" },
];

const features = [
  "OCR-powered procedure detection",
  "Smart hospital ranking algorithm",
  "Side-by-side cost comparison",
  "Decision confidence scoring",
  "Auto-generated doctor questions",
  "Exportable decision files",
];

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero px-4 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
        <div className="container relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground">
            <Shield className="h-4 w-4" />
            Prescription-Driven Hospital Comparison
          </div>
          <h1 className="mb-6 font-display text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground md:text-6xl">
            Make Informed Treatment Decisions
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80">
            Upload your prescription, compare partnered hospitals across cost, quality, and transparency — and receive ranked recommendations with decision confidence.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to={user ? "/dashboard" : "/signup"}>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to={user ? "/dashboard" : "/login"}>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                {user ? "Go to Dashboard" : "Log In"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-foreground">How TreatWise Works</h2>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="group rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-foreground">Platform Features</h2>
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-card">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-trust" />
                <span className="text-sm font-medium text-foreground">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
