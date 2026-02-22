import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shield, LogOut, Users, Send, BarChart3, User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hospitals } from "@/data/seed";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/hospital/dashboard", icon: Users, label: "Leads" },
  { to: "/hospital/respond", icon: Send, label: "Responses" },
  { to: "/hospital/performance", icon: BarChart3, label: "Performance" },
  { to: "/hospital/profile", icon: User, label: "Profile" },
];

export function HospitalSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const hospitalId = localStorage.getItem("tw_hospital_user");
  const hospital = hospitals.find((h) => h.id === hospitalId);

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-card">
      <div className="border-b border-border p-4">
        <Link to="/hospital/dashboard" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">TreatWise</span>
        </Link>
        <span className="mt-2 block rounded-full bg-primary/10 px-2.5 py-0.5 text-center text-xs font-medium text-primary">
          Hospital Response Portal
        </span>
      </div>

      {/* Hospital name */}
      {hospital && (
        <div className="border-b border-border px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold text-foreground">{hospital.name}</span>
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to}>
            <div
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                location.pathname === item.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </div>
          </Link>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground"
          onClick={() => {
            localStorage.removeItem("tw_hospital_user");
            navigate("/");
          }}
        >
          <LogOut className="mr-2 h-4 w-4" /> Log Out
        </Button>
      </div>
    </aside>
  );
}
