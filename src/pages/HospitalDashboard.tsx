import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { hospitals, procedures } from "@/data/seed";
import type { HospitalResponse } from "@/data/seed";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Send, CheckCircle2, AlertCircle, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/matching";

export default function HospitalDashboard() {
  const navigate = useNavigate();
  const { leads, updateLead, createHospitalResponse, hospitalResponses } = useAuth();
  const { toast } = useToast();
  const hospitalId = localStorage.getItem("tw_hospital_user");
  const [respondingTo, setRespondingTo] = useState<string | null>(null);

  const [packagePrice, setPackagePrice] = useState("");
  const [inclusions, setInclusions] = useState("");
  const [exclusions, setExclusions] = useState("");
  const [surgeonName, setSurgeonName] = useState("");
  const [admissionDays, setAdmissionDays] = useState("");
  const [bedAvailability, setBedAvailability] = useState(true);
  const [notes, setNotes] = useState("");

  if (!hospitalId) {
    navigate("/hospital/login");
    return null;
  }

  const hospital = hospitals.find((h) => h.id === hospitalId);
  const hospitalLeads = leads.filter((l) => l.hospitalId === hospitalId);

  const handleSubmitResponse = (leadId: string) => {
    const response: HospitalResponse = {
      id: crypto.randomUUID(),
      leadId,
      hospitalId: hospitalId!,
      packagePrice: Number(packagePrice),
      inclusions,
      exclusions,
      surgeonName,
      estimatedAdmissionDays: Number(admissionDays),
      bedAvailability,
      additionalNotes: notes,
      createdAt: new Date().toISOString(),
    };
    createHospitalResponse(response);
    updateLead(leadId, { status: "responded", leadStage: "reviewing" });
    setRespondingTo(null);
    resetForm();
    toast({ title: "Response sent!", description: "Patient will see your treatment plan." });
  };

  const resetForm = () => {
    setPackagePrice("");
    setInclusions("");
    setExclusions("");
    setSurgeonName("");
    setAdmissionDays("");
    setBedAvailability(true);
    setNotes("");
  };

  const hasResponded = (leadId: string) => hospitalResponses.some((r) => r.leadId === leadId);

  const pendingCount = hospitalLeads.filter((l) => l.status === "pending").length;
  const respondedCount = hospitalLeads.filter((l) => l.status === "responded").length;

  const statusColors: Record<string, string> = {
    pending: "bg-warning/15 text-warning-foreground border-warning/30",
    responded: "bg-trust/15 text-trust-foreground border-trust/30",
    closed: "bg-muted text-muted-foreground border-border",
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Leads Dashboard</h1>
        <p className="text-sm text-muted-foreground">Manage incoming patient treatment requests</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Users className="h-4 w-4" /> Total Leads</div>
          <p className="mt-1 text-2xl font-bold text-foreground">{hospitalLeads.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><AlertCircle className="h-4 w-4" /> Pending</div>
          <p className="mt-1 text-2xl font-bold text-foreground">{pendingCount}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-4 w-4" /> Responded</div>
          <p className="mt-1 text-2xl font-bold text-foreground">{respondedCount}</p>
        </div>
      </div>

      {/* Leads */}
      <h2 className="mb-4 font-display text-lg font-bold text-foreground">Incoming Leads</h2>
      {hospitalLeads.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center shadow-card">
          <Users className="mx-auto mb-3 h-8 w-8 text-muted-foreground/40" />
          <p className="text-muted-foreground">No leads yet. Leads appear when patients request treatment plans.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {hospitalLeads.map((lead) => {
            const proc = procedures.find((p) => p.id === lead.procedureId);
            const responded = hasResponded(lead.id);
            return (
              <div key={lead.id} className="rounded-xl border border-border bg-card shadow-card">
                <div className="flex items-center justify-between p-5">
                  <div>
                    <p className="font-semibold text-foreground">{proc?.name ?? "Unknown Procedure"}</p>
                    <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(lead.requestedAt).toLocaleString()}</span>
                      <span>Confidence: <strong className="text-foreground">{lead.confidenceScore}/100</strong></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={statusColors[lead.status]}>{lead.status}</Badge>
                    {!responded && (
                      <Button size="sm" onClick={() => setRespondingTo(respondingTo === lead.id ? null : lead.id)}>
                        <Send className="mr-1.5 h-3.5 w-3.5" /> Respond
                      </Button>
                    )}
                    {responded && (
                      <span className="flex items-center gap-1 text-sm font-medium text-trust">
                        <CheckCircle2 className="h-4 w-4" /> Sent
                      </span>
                    )}
                  </div>
                </div>

                {respondingTo === lead.id && (
                  <div className="border-t border-border bg-muted/30 p-5">
                    <h3 className="mb-4 font-display font-semibold text-foreground">Submit Treatment Plan</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-foreground">Package Price (₹)</label>
                        <Input type="number" placeholder="e.g. 350000" value={packagePrice} onChange={(e) => setPackagePrice(e.target.value)} />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-foreground">Surgeon Name</label>
                        <Input placeholder="Dr. Name" value={surgeonName} onChange={(e) => setSurgeonName(e.target.value)} />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-foreground">Est. Admission Days</label>
                        <Input type="number" placeholder="e.g. 5" value={admissionDays} onChange={(e) => setAdmissionDays(e.target.value)} />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-foreground">Bed Availability</label>
                        <select
                          value={bedAvailability ? "yes" : "no"}
                          onChange={(e) => setBedAvailability(e.target.value === "yes")}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="yes">Yes – Available</option>
                          <option value="no">No – Waitlist</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-foreground">Inclusions</label>
                        <Textarea placeholder="Room charges, surgeon fees, implant cost, physiotherapy..." value={inclusions} onChange={(e) => setInclusions(e.target.value)} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-foreground">Exclusions</label>
                        <Textarea placeholder="Post-discharge medicines, special implants..." value={exclusions} onChange={(e) => setExclusions(e.target.value)} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-foreground">Additional Notes</label>
                        <Textarea placeholder="Any additional information..." value={notes} onChange={(e) => setNotes(e.target.value)} />
                      </div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <Button onClick={() => handleSubmitResponse(lead.id)} disabled={!packagePrice || !surgeonName}>
                        <Send className="mr-1.5 h-4 w-4" /> Submit Response
                      </Button>
                      <Button variant="ghost" onClick={() => setRespondingTo(null)}>Cancel</Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
