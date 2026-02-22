import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Shield, LogOut, Menu, X, User, FileText, ClipboardList, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function PatientNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/patient/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">TreatWise</span>
          </Link>
          <span className="hidden rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary sm:inline">
            Patient Decision Workspace
          </span>
        </div>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          <Link to="/patient/dashboard"><Button variant="ghost" size="sm"><Upload className="mr-1.5 h-4 w-4" />New Decision</Button></Link>
          <Link to="/patient/decisions"><Button variant="ghost" size="sm"><FileText className="mr-1.5 h-4 w-4" />My Decisions</Button></Link>
          <Link to="/patient/responses"><Button variant="ghost" size="sm"><ClipboardList className="mr-1.5 h-4 w-4" />Responses</Button></Link>
          <Link to="/patient/profile"><Button variant="ghost" size="sm"><User className="mr-1.5 h-4 w-4" />{user?.name}</Button></Link>
          <Button variant="outline" size="sm" onClick={() => { logout(); navigate("/"); }}>
            <LogOut className="mr-1.5 h-4 w-4" /> Logout
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-card px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-2">
            <Link to="/patient/dashboard" onClick={() => setMenuOpen(false)}><Button variant="ghost" size="sm" className="w-full justify-start">New Decision</Button></Link>
            <Link to="/patient/decisions" onClick={() => setMenuOpen(false)}><Button variant="ghost" size="sm" className="w-full justify-start">My Decisions</Button></Link>
            <Link to="/patient/responses" onClick={() => setMenuOpen(false)}><Button variant="ghost" size="sm" className="w-full justify-start">Responses</Button></Link>
            <Link to="/patient/profile" onClick={() => setMenuOpen(false)}><Button variant="ghost" size="sm" className="w-full justify-start">Profile</Button></Link>
            <Button variant="outline" size="sm" onClick={() => { logout(); navigate("/"); setMenuOpen(false); }}>Logout</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
