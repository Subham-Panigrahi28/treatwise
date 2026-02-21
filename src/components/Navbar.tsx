import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Shield, LogOut, FileText, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">TreatWise</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          <Link to="/how-it-works"><Button variant="ghost" size="sm">How It Works</Button></Link>
          <Link to="/for-hospitals"><Button variant="ghost" size="sm">For Hospitals</Button></Link>
          <Link to="/pricing"><Button variant="ghost" size="sm">Pricing</Button></Link>
          {user ? (
            <>
              <Link to="/dashboard"><Button variant="ghost" size="sm">Dashboard</Button></Link>
              <Link to="/decisions"><Button variant="ghost" size="sm"><FileText className="mr-1.5 h-4 w-4" />Decisions</Button></Link>
              <Link to="/profile"><Button variant="ghost" size="sm"><User className="mr-1.5 h-4 w-4" />{user.name}</Button></Link>
              <Button variant="outline" size="sm" onClick={() => { logout(); navigate("/"); }}>
                <LogOut className="mr-1.5 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
              <Link to="/signup"><Button size="sm">Sign up</Button></Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-card px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-2">
            <Link to="/how-it-works" onClick={() => setMenuOpen(false)}><Button variant="ghost" size="sm" className="w-full justify-start">How It Works</Button></Link>
            <Link to="/for-hospitals" onClick={() => setMenuOpen(false)}><Button variant="ghost" size="sm" className="w-full justify-start">For Hospitals</Button></Link>
            <Link to="/pricing" onClick={() => setMenuOpen(false)}><Button variant="ghost" size="sm" className="w-full justify-start">Pricing</Button></Link>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}><Button variant="ghost" size="sm" className="w-full justify-start">Dashboard</Button></Link>
                <Link to="/decisions" onClick={() => setMenuOpen(false)}><Button variant="ghost" size="sm" className="w-full justify-start">My Decisions</Button></Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)}><Button variant="ghost" size="sm" className="w-full justify-start">Profile</Button></Link>
                <Button variant="outline" size="sm" onClick={() => { logout(); navigate("/"); setMenuOpen(false); }}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}><Button variant="ghost" size="sm" className="w-full">Log in</Button></Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}><Button size="sm" className="w-full">Sign up</Button></Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
