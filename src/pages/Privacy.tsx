import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";

const policies = [
  { icon: Lock, title: "Data Encryption", desc: "All prescription data is processed securely. We never store raw prescription images after OCR extraction is complete." },
  { icon: Eye, title: "No Third-Party Sharing", desc: "Your medical data is never shared with advertisers, insurers, or any third party. Hospital leads contain only procedure and readiness data." },
  { icon: Shield, title: "Consent First", desc: "We require explicit consent before processing any prescription. You control when and how your data is used." },
  { icon: FileCheck, title: "Data Portability", desc: "Export or delete your decision files at any time. Your data belongs to you." },
];

export default function Privacy() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-hero px-4 py-16 text-center">
          <h1 className="font-display text-4xl font-extrabold text-primary-foreground">Privacy & Trust</h1>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">Your health data deserves the highest standard of protection.</p>
        </section>

        <section className="container mx-auto max-w-3xl px-4 py-16">
          <div className="space-y-8">
            {policies.map((p, i) => (
              <div key={i} className="flex gap-5 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <p.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{p.title}</h3>
                  <p className="mt-1 text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-border bg-muted/50 p-6">
            <h3 className="font-display font-bold text-foreground">Medical Disclaimer</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              TreatWise provides informational hospital comparisons based on structured partner data. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical decisions.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
