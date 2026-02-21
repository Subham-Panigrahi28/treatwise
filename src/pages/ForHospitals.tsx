import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Users, Target, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";

const benefits = [
  { icon: Target, title: "Qualified Leads", desc: "Receive leads from patients who have already been diagnosed and are ready for treatment — no cold outreach." },
  { icon: Users, title: "Patient Intent Data", desc: "Every lead includes the procedure, confidence score, and readiness stage so your team can prioritize effectively." },
  { icon: TrendingUp, title: "Growth Channel", desc: "TreatWise drives procedure-specific patient volume directly to your facility through transparent comparison." },
  { icon: ShieldCheck, title: "Transparency Badge", desc: "Hospitals that share pricing and outcome data earn visibility and trust badges on the platform." },
];

export default function ForHospitals() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-hero px-4 py-16 text-center">
          <h1 className="font-display text-4xl font-extrabold text-primary-foreground">For Hospitals</h1>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">Partner with TreatWise to receive high-intent, qualified treatment leads.</p>
        </section>

        <section className="container mx-auto max-w-4xl px-4 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            {benefits.map((b, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6 shadow-card animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <b.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-foreground">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl border-2 border-accent/30 bg-accent/5 p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground">Become a Partner Hospital</h2>
            <p className="mx-auto mt-2 max-w-lg text-muted-foreground">Join our network of leading Pune hospitals and start receiving qualified treatment leads.</p>
            <Button size="lg" className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
              Contact Us <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
