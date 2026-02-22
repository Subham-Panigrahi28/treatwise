import { Link } from "react-router-dom";
import { Shield, UserCircle, Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

const highlights = [
  "Upload your prescription securely",
  "AI-powered hospital ranking",
  "Verified package pricing from partners",
  "Decision confidence scoring",
];

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Minimal topbar */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">TreatWise</span>
          </Link>
          <div className="hidden items-center gap-1 sm:flex">
            <Link to="/how-it-works"><Button variant="ghost" size="sm">How It Works</Button></Link>
            <Link to="/for-hospitals"><Button variant="ghost" size="sm">For Hospitals</Button></Link>
            <Link to="/pricing"><Button variant="ghost" size="sm">Pricing</Button></Link>
            <Link to="/about"><Button variant="ghost" size="sm">About</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-1 items-center overflow-hidden bg-gradient-hero px-4 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
        <div className="container relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground">
            <Shield className="h-4 w-4" />
            Prescription-Driven Hospital Comparison
          </div>
          <h1 className="mb-6 font-display text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground md:text-6xl">
            Make the right hospital decision after diagnosis.
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-primary-foreground/80">
            Upload your prescription and compare hospitals transparently — with verified pricing, decision confidence, and real treatment plans.
          </p>

          {/* Role selection */}
          <div className="mx-auto flex max-w-xl flex-col items-stretch gap-4 sm:flex-row sm:gap-6">
            <Link to="/patient/login" className="flex-1">
              <div className="group flex h-full cursor-pointer flex-col items-center rounded-2xl border-2 border-primary-foreground/20 bg-primary-foreground/10 p-8 backdrop-blur-sm transition-all hover:border-primary-foreground/40 hover:bg-primary-foreground/15">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/15">
                  <UserCircle className="h-8 w-8 text-primary-foreground" />
                </div>
                <h2 className="mb-2 font-display text-xl font-bold text-primary-foreground">I am a Patient</h2>
                <p className="mb-4 text-sm text-primary-foreground/70">
                  Compare hospitals, get treatment plans, and make confident decisions.
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Get Started <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>

            <Link to="/hospital/login" className="flex-1">
              <div className="group flex h-full cursor-pointer flex-col items-center rounded-2xl border-2 border-primary-foreground/20 bg-primary-foreground/10 p-8 backdrop-blur-sm transition-all hover:border-primary-foreground/40 hover:bg-primary-foreground/15">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/15">
                  <Building2 className="h-8 w-8 text-primary-foreground" />
                </div>
                <h2 className="mb-2 font-display text-xl font-bold text-primary-foreground">I represent a Hospital</h2>
                <p className="mb-4 text-sm text-primary-foreground/70">
                  Receive qualified leads and respond with verified treatment plans.
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Hospital Portal <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>

          {/* Quick highlights */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {highlights.map((h) => (
              <span key={h} className="flex items-center gap-1.5 text-sm text-primary-foreground/70">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> {h}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
