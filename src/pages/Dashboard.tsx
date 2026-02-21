import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { detectProcedure } from "@/lib/matching";
import { samplePrescriptionText } from "@/data/seed";
import type { Procedure } from "@/data/seed";
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Step = "upload" | "processing" | "confirm";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState<Step>("upload");
  const [consent, setConsent] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [detected, setDetected] = useState<Procedure | null>(null);
  const [fileName, setFileName] = useState("");

  const handleFile = useCallback((file: File) => {
    if (!consent) {
      toast({ title: "Consent required", description: "Please accept the privacy consent before uploading.", variant: "destructive" });
      return;
    }
    setFileName(file.name);
    setStep("processing");

    // Simulate OCR processing
    setTimeout(() => {
      const text = samplePrescriptionText; // In prod, this would be Tesseract OCR
      setExtractedText(text);
      const proc = detectProcedure(text);
      setDetected(proc);
      setStep("confirm");
    }, 2000);
  }, [consent, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleUseSample = () => {
    if (!consent) {
      toast({ title: "Consent required", description: "Please accept the privacy consent before proceeding.", variant: "destructive" });
      return;
    }
    setFileName("sample-prescription.pdf");
    setStep("processing");
    setTimeout(() => {
      setExtractedText(samplePrescriptionText);
      const proc = detectProcedure(samplePrescriptionText);
      setDetected(proc);
      setStep("confirm");
    }, 1500);
  };

  const handleConfirm = () => {
    if (detected) {
      navigate(`/treatment/${detected.id}`);
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-2xl px-4">
          <h1 className="mb-2 font-display text-3xl font-bold text-foreground">Upload Prescription</h1>
          <p className="mb-8 text-muted-foreground">Upload your prescription to detect the recommended procedure and compare hospitals.</p>

          {step === "upload" && (
            <div className="space-y-6">
              {/* Consent */}
              <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/50 p-4">
                <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" />
                <label htmlFor="consent" className="text-sm text-foreground">
                  I consent to TreatWise processing my prescription data for the purpose of procedure detection and hospital comparison. My data will not be shared with third parties.
                </label>
              </div>

              {/* Upload area */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-colors ${
                  consent ? "border-primary/40 bg-primary/5 hover:border-primary/60" : "border-border bg-muted/30 opacity-60"
                }`}
              >
                <Upload className="mb-4 h-10 w-10 text-primary/60" />
                <p className="mb-2 font-medium text-foreground">Drag & drop your prescription here</p>
                <p className="mb-4 text-sm text-muted-foreground">Supports JPG, PNG, PDF</p>
                <label>
                  <input type="file" accept="image/*,.pdf" onChange={handleInputChange} className="hidden" disabled={!consent} />
                  <Button variant="outline" disabled={!consent} asChild>
                    <span>Choose File</span>
                  </Button>
                </label>
              </div>

              {/* Sample button */}
              <div className="text-center">
                <Button variant="ghost" onClick={handleUseSample} className="text-primary">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Use sample prescription (demo)
                </Button>
              </div>
            </div>
          )}

          {step === "processing" && (
            <div className="flex flex-col items-center rounded-xl border border-border bg-card p-12 shadow-card">
              <Loader2 className="mb-4 h-10 w-10 animate-spin text-primary" />
              <p className="mb-1 font-display text-lg font-semibold text-foreground">Processing Prescription</p>
              <p className="text-sm text-muted-foreground">Running OCR on {fileName}...</p>
            </div>
          )}

          {step === "confirm" && (
            <div className="space-y-6">
              {/* Extracted text */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-card">
                <div className="mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <h3 className="font-display font-semibold text-foreground">Extracted Text</h3>
                </div>
                <pre className="max-h-48 overflow-auto rounded-lg bg-muted p-4 text-xs text-foreground">{extractedText.trim()}</pre>
              </div>

              {/* Detection result */}
              {detected ? (
                <div className="rounded-xl border-2 border-trust/30 bg-trust/5 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-trust" />
                    <h3 className="font-display font-semibold text-foreground">Procedure Detected</h3>
                  </div>
                  <p className="mb-1 text-lg font-bold text-foreground">{detected.name}</p>
                  <p className="mb-4 text-sm text-muted-foreground">{detected.specialty} • {detected.city}</p>
                  <Button onClick={handleConfirm} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Confirm & Continue
                  </Button>
                </div>
              ) : (
                <div className="rounded-xl border-2 border-destructive/30 bg-destructive/5 p-5">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <h3 className="font-display font-semibold text-foreground">No procedure detected</h3>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">We couldn't detect a known procedure. Try uploading a clearer image.</p>
                  <Button variant="outline" onClick={() => setStep("upload")} className="mt-3">Try Again</Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
