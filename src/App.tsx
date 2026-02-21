import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TreatmentInfo from "./pages/TreatmentInfo";
import Comparison from "./pages/Comparison";
import Decisions from "./pages/Decisions";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import HowItWorks from "./pages/HowItWorks";
import ForHospitals from "./pages/ForHospitals";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import Admin from "./pages/Admin";
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
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/treatment/:procedureId" element={<TreatmentInfo />} />
            <Route path="/compare/:procedureId" element={<Comparison />} />
            <Route path="/insights/:procedureId" element={<Insights />} />
            <Route path="/decisions" element={<Decisions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/for-hospitals" element={<ForHospitals />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
