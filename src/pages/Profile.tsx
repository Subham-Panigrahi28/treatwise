import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { User, Mail, Calendar, FileText, LogOut } from "lucide-react";

export default function Profile() {
  const { user, logout, decisions } = useAuth();
  const navigate = useNavigate();

  if (!user) { navigate("/login"); return null; }

  const userDecisions = decisions.filter((d) => d.userId === user.id);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-2xl px-4">
          <h1 className="mb-8 font-display text-3xl font-bold text-foreground">Profile</h1>

          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">{user.name}</h2>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" /> {user.email}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" /> Saved Decisions
                </div>
                <p className="mt-1 font-display text-2xl font-bold text-foreground">{userDecisions.length}</p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" /> Member Since
                </div>
                <p className="mt-1 font-display text-sm font-bold text-foreground">
                  {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
          </div>

          <Button variant="outline" className="mt-6" onClick={() => { logout(); navigate("/"); }}>
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
