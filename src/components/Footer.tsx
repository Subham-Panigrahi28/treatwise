import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-10">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-display font-bold text-foreground">TreatWise</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Prescription-driven hospital comparison for confident treatment decisions.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Platform</h4>
            <div className="flex flex-col gap-1.5">
              <Link to="/how-it-works" className="text-xs text-muted-foreground hover:text-foreground">How It Works</Link>
              <Link to="/for-hospitals" className="text-xs text-muted-foreground hover:text-foreground">For Hospitals</Link>
              <Link to="/pricing" className="text-xs text-muted-foreground hover:text-foreground">Pricing</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Company</h4>
            <div className="flex flex-col gap-1.5">
              <Link to="/about" className="text-xs text-muted-foreground hover:text-foreground">About</Link>
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground">Privacy & Trust</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Legal</h4>
            <p className="text-xs text-muted-foreground">
              TreatWise provides decision support and does not replace medical advice. Always consult a qualified healthcare provider.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} TreatWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
