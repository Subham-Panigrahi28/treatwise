import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "₹15,000",
    period: "/month",
    desc: "For small hospitals getting started",
    features: ["Up to 25 leads/month", "Basic lead dashboard", "Email notifications", "Standard support"],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "₹35,000",
    period: "/month",
    desc: "For hospitals scaling patient acquisition",
    features: ["Up to 100 leads/month", "Priority lead routing", "Analytics dashboard", "Transparency badge", "Dedicated support"],
    highlighted: true,
  },
  {
    name: "Pay Per Lead",
    price: "₹1,500",
    period: "/lead",
    desc: "Flexible option — pay only for results",
    features: ["No monthly commitment", "Verified patient intent", "Lead quality scoring", "Basic reporting"],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-hero px-4 py-16 text-center">
          <h1 className="font-display text-4xl font-extrabold text-primary-foreground">Hospital Pricing</h1>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">Transparent pricing for hospital partners. Patients always use TreatWise free.</p>
        </section>

        <section className="container mx-auto max-w-5xl px-4 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-xl border-2 p-6 shadow-card animate-fade-in ${
                  plan.highlighted ? "border-accent bg-accent/5" : "border-border bg-card"
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {plan.highlighted && (
                  <span className="mb-4 inline-block rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-accent-foreground">Most Popular</span>
                )}
                <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-extrabold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.desc}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-trust" /> {f}
                    </li>
                  ))}
                </ul>
                <Button className={`mt-6 w-full ${plan.highlighted ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}`} variant={plan.highlighted ? "default" : "outline"}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
