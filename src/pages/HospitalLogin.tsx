import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hospitals } from "@/data/seed";
import { Building2, Shield } from "lucide-react";

export default function HospitalLogin() {
  const navigate = useNavigate();
  const [selectedHospital, setSelectedHospital] = useState("");

  const handleLogin = () => {
    if (!selectedHospital) return;
    localStorage.setItem("tw_hospital_user", selectedHospital);
    navigate("/hospital/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="mb-4 inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">TreatWise</span>
          </Link>
          <p className="mt-2 text-muted-foreground">Hospital Response Portal</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 shadow-card">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">Hospital Login</h1>
              <p className="text-sm text-muted-foreground">Access your lead management portal</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Select Hospital</label>
              <select
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Choose hospital...</option>
                {hospitals.map((h) => (
                  <option key={h.id} value={h.id}>{h.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
              <Input type="password" placeholder="Enter hospital password" defaultValue="demo123" />
            </div>
            <Button onClick={handleLogin} className="w-full" disabled={!selectedHospital}>
              Sign In to Portal
            </Button>
            <p className="text-center text-xs text-muted-foreground">Demo: Select any hospital, password is pre-filled</p>
          </div>
        </div>
      </div>
    </div>
  );
}
