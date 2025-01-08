import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SafeHaven from "./components/menu";
import Header from "./components/header";
import { Footer } from "./components/footer";
import AppointmentPage from "./components/patient/appointmentPage";
import PsychologistAppointmentPage from "./components/psychologist/appointmentPage";
import PatientHistoryPage from "./components/patient/patientHistoryPage";
import ProfilePage from "./components/patient/profilePage";
import PsychologistPage from "./components/psychologistPage";
import PatientPage from "./components/psychologist/patientList";
import Dashboard from "./components/patient/dashboard";
import DashboardPsychologist from "./components/psychologist/dashboard";
import { AuthProvider } from "./contexts/authcontext";
import Login from "./components/login";
import SignUp from "./components/signUp";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <Routes>
              
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboardPsychologist" element={<DashboardPsychologist />} />
            <Route path="/agendar-cita" element={<AppointmentPage />} />
            <Route path="/agendar-cita-psicologo" element={<PsychologistAppointmentPage />} />
            <Route path="/historial" element={<PatientHistoryPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="/psicologos" element={<PsychologistPage />} />
            <Route path="/pacientes" element={<PatientPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
