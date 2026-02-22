import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PatientNavbar } from "@/components/PatientNavbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { hospitals, procedures } from "@/data/seed";
import { formatCurrency } from "@/lib/matching";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Building2, Clock, CheckCircle2, AlertCircle, IndianRupee, Stethoscope, BedDouble, Calendar, GitCompare } from "lucide-react";

export default function PatientResponses() {
  const navigate = useNavigate();
  const { user, leads, hospitalResponses } = useAuth();
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set());

  if (!user) { navigate("/patient/login"); return null; }

  const userLeads = leads.filter((l) => l.userId === user.id);
  const responses = hospitalResponses.filter((r) =>
    userLeads.some((l) => l.id === r.leadId)
  );

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const comparedResponses = responses.filter((r) => compareIds.has(r.id));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PatientNavbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-5xl px-4">
          <h1 className="mb-2 font-display text-3xl font-bold text-foreground">Hospital Responses</h1>
          <p className="mb-8 text-muted-foreground">Treatment plans received from hospitals you contacted.</p>

          {/* Pending leads */}
          {userLeads.filter((l) => l.status === "pending").length > 0 && (
            <div className="mb-8">
              <h2 className="mb-3 font-display text-lg font-semibold text-foreground">Awaiting Response</h2>
              <div className="space-y-2">
                {userLeads.filter((l) => l.status === "pending").map((lead) => {
                  const hosp = hospitals.find((h) => h.id === lead.hospitalId);
                  const proc = procedures.find((p) => p.id === lead.procedureId);
                  return (
                    <div key={lead.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4 shadow-card">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning/15">
                          <Clock className="h-4 w-4 text-warning-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{hosp?.name}</p>
                          <p className="text-sm text-muted-foreground">{proc?.name}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-warning/10 text-warning-foreground border-warning/30">
                        <Clock className="mr-1 h-3 w-3" /> Pending
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Received responses */}
          {responses.length > 0 ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-foreground">Received Treatment Plans</h2>
                {compareIds.size >= 2 && (
                  <Badge className="bg-primary text-primary-foreground">
                    <GitCompare className="mr-1 h-3 w-3" /> {compareIds.size} selected for comparison
                  </Badge>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {responses.map((resp) => {
                  const hosp = hospitals.find((h) => h.id === resp.hospitalId);
                  const lead = userLeads.find((l) => l.id === resp.leadId);
                  const proc = procedures.find((p) => p.id === lead?.procedureId);
                  const isComparing = compareIds.has(resp.id);

                  return (
                    <div
                      key={resp.id}
                      className={`rounded-xl border-2 bg-card p-5 shadow-card transition-all ${
                        isComparing ? "border-primary shadow-card-hover" : "border-border"
                      }`}
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-primary" />
                            <h3 className="font-display font-bold text-foreground">{hosp?.name}</h3>
                          </div>
                          <p className="mt-0.5 text-sm text-muted-foreground">{proc?.name}</p>
                        </div>
                        {hosp?.isPartner && (
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge className="bg-trust text-trust-foreground">
                                <CheckCircle2 className="mr-1 h-3 w-3" /> Verified
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>Verified package from partner hospital</TooltipContent>
                          </Tooltip>
                        )}
                      </div>

                      <div className="mb-4 grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-muted p-3">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <IndianRupee className="h-3 w-3" /> Package Price
                          </div>
                          <p className="mt-1 text-lg font-bold text-primary">{formatCurrency(resp.packagePrice)}</p>
                        </div>
                        <div className="rounded-lg bg-muted p-3">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Stethoscope className="h-3 w-3" /> Surgeon
                          </div>
                          <p className="mt-1 text-sm font-semibold text-foreground">{resp.surgeonName}</p>
                        </div>
                        <div className="rounded-lg bg-muted p-3">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" /> Admission
                          </div>
                          <p className="mt-1 text-sm font-semibold text-foreground">{resp.estimatedAdmissionDays} days</p>
                        </div>
                        <div className="rounded-lg bg-muted p-3">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <BedDouble className="h-3 w-3" /> Bed
                          </div>
                          <p className={`mt-1 text-sm font-semibold ${resp.bedAvailability ? "text-trust" : "text-destructive"}`}>
                            {resp.bedAvailability ? "Available" : "Waitlist"}
                          </p>
                        </div>
                      </div>

                      {resp.inclusions && (
                        <div className="mb-3">
                          <p className="mb-1 text-xs font-medium text-muted-foreground">Inclusions</p>
                          <p className="text-sm text-foreground">{resp.inclusions}</p>
                        </div>
                      )}
                      {resp.exclusions && (
                        <div className="mb-3">
                          <p className="mb-1 text-xs font-medium text-muted-foreground">Exclusions</p>
                          <p className="text-sm text-foreground">{resp.exclusions}</p>
                        </div>
                      )}

                      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" /> {new Date(resp.createdAt).toLocaleString()}
                        </span>
                        <Button
                          size="sm"
                          variant={isComparing ? "default" : "outline"}
                          onClick={() => toggleCompare(resp.id)}
                        >
                          <GitCompare className="mr-1.5 h-3.5 w-3.5" />
                          {isComparing ? "Selected" : "Compare"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Side-by-side comparison */}
              {comparedResponses.length >= 2 && (
                <div className="mt-10">
                  <h2 className="mb-4 font-display text-lg font-bold text-foreground">Side-by-Side Comparison</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="p-3 text-left text-sm font-medium text-muted-foreground">Attribute</th>
                          {comparedResponses.map((r) => {
                            const hosp = hospitals.find((h) => h.id === r.hospitalId);
                            return (
                              <th key={r.id} className="p-3 text-left text-sm font-bold text-foreground">
                                {hosp?.name}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr className="border-b border-border">
                          <td className="p-3 text-muted-foreground">Package Price</td>
                          {comparedResponses.map((r) => (
                            <td key={r.id} className="p-3 font-semibold text-primary">{formatCurrency(r.packagePrice)}</td>
                          ))}
                        </tr>
                        <tr className="border-b border-border">
                          <td className="p-3 text-muted-foreground">Surgeon</td>
                          {comparedResponses.map((r) => (
                            <td key={r.id} className="p-3 text-foreground">{r.surgeonName}</td>
                          ))}
                        </tr>
                        <tr className="border-b border-border">
                          <td className="p-3 text-muted-foreground">Admission Days</td>
                          {comparedResponses.map((r) => (
                            <td key={r.id} className="p-3 text-foreground">{r.estimatedAdmissionDays}</td>
                          ))}
                        </tr>
                        <tr className="border-b border-border">
                          <td className="p-3 text-muted-foreground">Bed Available</td>
                          {comparedResponses.map((r) => (
                            <td key={r.id} className={`p-3 font-medium ${r.bedAvailability ? "text-trust" : "text-destructive"}`}>
                              {r.bedAvailability ? "Yes" : "No"}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-border">
                          <td className="p-3 text-muted-foreground">Inclusions</td>
                          {comparedResponses.map((r) => (
                            <td key={r.id} className="p-3 text-foreground">{r.inclusions || "—"}</td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-3 text-muted-foreground">Exclusions</td>
                          {comparedResponses.map((r) => (
                            <td key={r.id} className="p-3 text-foreground">{r.exclusions || "—"}</td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          ) : userLeads.filter((l) => l.status === "pending").length === 0 && (
            <div className="rounded-xl border border-border bg-card p-12 text-center shadow-card">
              <AlertCircle className="mx-auto mb-3 h-8 w-8 text-muted-foreground/40" />
              <p className="mb-4 text-muted-foreground">No responses yet. Request treatment plans from hospital comparisons.</p>
              <Button onClick={() => navigate("/patient/dashboard")}>Upload Prescription</Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
