import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Landing pages
import Index from "./pages/Index";
import ForDoctors from "./pages/ForDoctors";
import NotFound from "./pages/NotFound";

// Auth + inner pages
import Login from "./pages/Login";
import PatientRegister from "./pages/PatientRegister";
import DoctorRegister from "./pages/DoctorRegister";
import DoctorDirectory from "./pages/DoctorDirectory";
import DoctorProfile from "./pages/DoctorProfile";
import PatientDashboard from "./pages/PatientDashboard";
import PatientProfilePage from "./pages/PatientProfilePage";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorProfileEdit from "./pages/DoctorProfileEdit";
import ConsultationNotes from "./pages/ConsultationNotes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public landing */}
            <Route path="/" element={<Index />} />
            <Route path="/for-doctors" element={<ForDoctors />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register/patient" element={<PatientRegister />} />
            <Route path="/register/doctor" element={<DoctorRegister />} />

            {/* Doctor directory — public */}
            <Route path="/doctors" element={<DoctorDirectory />} />
            <Route path="/doctors/:id" element={<DoctorProfile />} />

            {/* Patient protected */}
            <Route path="/patient/dashboard" element={<ProtectedRoute role="patient"><PatientDashboard /></ProtectedRoute>} />
            <Route path="/patient/profile" element={<ProtectedRoute role="patient"><PatientProfilePage /></ProtectedRoute>} />

            {/* Doctor protected */}
            <Route path="/doctor/dashboard" element={<ProtectedRoute role="doctor"><DoctorDashboard /></ProtectedRoute>} />
            <Route path="/doctor/profile/edit" element={<ProtectedRoute role="doctor"><DoctorProfileEdit /></ProtectedRoute>} />
            <Route path="/doctor/appointments/:id/notes" element={<ProtectedRoute role="doctor"><ConsultationNotes /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
