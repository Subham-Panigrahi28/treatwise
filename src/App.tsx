import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PatientGuard, HospitalGuard } from "@/components/RoleGuard";
import { HospitalLayout } from "@/components/HospitalLayout";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TreatmentInfo from "./pages/TreatmentInfo";
import Comparison from "./pages/Comparison";
import Decisions from "./pages/Decisions";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import PatientResponses from "./pages/PatientResponses";
import HowItWorks from "./pages/HowItWorks";
import ForHospitals from "./pages/ForHospitals";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import Admin from "./pages/Admin";
import HospitalLogin from "./pages/HospitalLogin";
import HospitalDashboard from "./pages/HospitalDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/for-hospitals" element={<ForHospitals />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about" element={<About />} />

            {/* Patient auth */}
            <Route path="/patient/login" element={<Login />} />
            <Route path="/patient/signup" element={<Signup />} />

            {/* Patient protected */}
            <Route path="/patient/dashboard" element={<PatientGuard><Dashboard /></PatientGuard>} />
            <Route path="/patient/treatment/:procedureId" element={<PatientGuard><TreatmentInfo /></PatientGuard>} />
            <Route path="/patient/compare/:procedureId" element={<PatientGuard><Comparison /></PatientGuard>} />
            <Route path="/patient/insights/:procedureId" element={<PatientGuard><Insights /></PatientGuard>} />
            <Route path="/patient/decisions" element={<PatientGuard><Decisions /></PatientGuard>} />
            <Route path="/patient/responses" element={<PatientGuard><PatientResponses /></PatientGuard>} />
            <Route path="/patient/profile" element={<PatientGuard><Profile /></PatientGuard>} />

            {/* Hospital auth */}
            <Route path="/hospital/login" element={<HospitalLogin />} />

            {/* Hospital protected */}
            <Route path="/hospital/dashboard" element={<HospitalGuard><HospitalLayout><HospitalDashboard /></HospitalLayout></HospitalGuard>} />

            {/* Admin */}
            <Route path="/admin" element={<Admin />} />

            {/* Legacy redirects - keep old routes working */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
