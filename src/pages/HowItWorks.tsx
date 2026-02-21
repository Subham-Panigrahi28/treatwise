import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Upload, Search, BarChart3, FileCheck, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  { icon: Upload, num: "01", title: "Upload Your Prescription", desc: "Securely upload the prescription image or PDF you received from your doctor. Your data is processed with strict privacy controls." },
  { icon: Search, num: "02", title: "Automatic Procedure Detection", desc: "Our OCR engine extracts text and identifies the recommended procedure using intelligent keyword matching. You confirm before proceeding." },
  { icon: BarChart3, num: "03", title: "Hospital Comparison", desc: "TreatWise compares partnered hospitals across cost, specialization, transparency, and recovery quality using a weighted scoring algorithm." },
  { icon: FileCheck, num: "04", title: "Decision Confidence", desc: "Receive a confidence score with reasoning bullets, suggested questions for your hospital visit, and an exportable decision file." },
];

export default function HowItWorks() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-hero px-4 py-16 text-center">
          <h1 className="font-display text-4xl font-extrabold text-primary-foreground">How TreatWise Works</h1>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">From prescription to confident decision in four simple steps.</p>
        </section>

        <section className="container mx-auto max-w-3xl px-4 py-16">
          <div className="space-y-10">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-6 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <s.icon className="h-7 w-7 text-primary" />
                  </div>
                  {i < steps.length - 1 && <div className="mt-2 h-full w-px bg-border" />}
                </div>
                <div className="pb-4">
                  <p className="text-xs font-bold text-accent">STEP {s.num}</p>
                  <h3 className="mt-1 font-display text-xl font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/signup">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
