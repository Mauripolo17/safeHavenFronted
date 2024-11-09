import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SafeHaven from './components/menu';
import Header from './components/header';
import { Footer } from './components/footer';
import AuthMenu from './components/authmenu';
import AppointmentPage from './components/appointmentpage';
import PatientHistoryPage from './components/patienthistorypage';
import ProfilePage from './components/profilepage';
import Dashboard from './components/dashboard';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<SafeHaven />} />
          <Route path="/login" element={<AuthMenu />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agendar-cita" element={<AppointmentPage />} />
          <Route path="/historial" element={<PatientHistoryPage/>} />
          <Route path="/perfil" element={<ProfilePage/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
