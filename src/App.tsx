import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SafeHaven from "./components/menu";
import Header from "./components/header";
import { Footer } from "./components/footer";
import AppointmentPage from "./components/patient/appointmentPage";
import PatientHistoryPage from "./components/patient/patientHistoryPage";
import ProfilePage from "./components/patient/profilePage";
import PsychologistPage from "./components/psychologistPage";
import Dashboard from "./components/patient/dashboard";
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
            <Route path="/" element={<SafeHaven />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/agendar-cita" element={<AppointmentPage />} />
            <Route path="/historial" element={<PatientHistoryPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="/psicologos" element={<PsychologistPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
