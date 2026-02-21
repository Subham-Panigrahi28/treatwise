import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Target, Heart, Users } from "lucide-react";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-hero px-4 py-16 text-center">
          <h1 className="font-display text-4xl font-extrabold text-primary-foreground">About TreatWise</h1>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">Empowering patients to make informed treatment decisions.</p>
        </section>

        <section className="container mx-auto max-w-3xl px-4 py-16">
          <div className="mb-12 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              TreatWise was born from a simple observation: after receiving a diagnosis, patients are left to navigate hospital choices with little structured information. Costs vary wildly, quality is opaque, and decisions are often made under pressure.
            </p>
            <p>
              We built TreatWise to bridge this gap. By partnering directly with hospitals to collect structured data — pricing, specialization scores, transparency metrics, and recovery outcomes — we enable patients to compare options objectively.
            </p>
            <p>
              TreatWise focuses exclusively on the <strong className="text-foreground">decision stage after diagnosis</strong>. We are not a booking platform, insurance tool, or review site. We are a decision-support engine.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Target, title: "Mission", desc: "Make hospital comparison transparent and data-driven for every patient." },
              { icon: Heart, title: "Values", desc: "Patient-first design, data integrity, privacy by default, radical transparency." },
              { icon: Users, title: "Team", desc: "Healthcare technologists, data scientists, and patient advocates based in Pune." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-card text-center">
                <item.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                <h3 className="font-display font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
