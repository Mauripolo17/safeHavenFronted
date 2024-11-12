import React, { useState } from 'react';
import { Container, Card, Table, Badge, Button, Modal } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaIdCard, FaHeart } from 'react-icons/fa';

interface Patient {
  id: number;
  nombre: string;
  apellido: string;
  correoElectronico: string;
  password: string;
  edad: number;
  telefono: number;
  sexo: string;
  fechaDeNacimiento: string;
  aseguradora: string;
  estadoDeSalud: string;
  fechaDeRegistro: string;
  rol: number;
}

const PatientDetail: React.FC<{
  patient: Patient;
  show: boolean;
  onHide: () => void;
}> = ({ patient, show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Información del Paciente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-4">
            <div className="text-center mb-3">
              <div 
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto" 
                style={{ width: '150px', height: '150px', fontSize: '4rem' }}
              >
                <FaUser />
              </div>
            </div>
            <div className="text-center">
              <Badge bg={patient.estadoDeSalud === 'Saludable' ? 'success' : 'warning'}>
                {patient.estadoDeSalud}
              </Badge>
            </div>
          </div>
          <div className="col-md-8">
            <h3>{`${patient.nombre} ${patient.apellido}`}</h3>
            
            <div className="mb-3">
              <h5>Información Personal</h5>
              <p><FaIdCard className="me-2" /><strong>ID:</strong> {patient.id}</p>
              <p><FaUser className="me-2" /><strong>Sexo:</strong> {patient.sexo}</p>
              <p><FaCalendar className="me-2" /><strong>Fecha de Nacimiento:</strong> {patient.fechaDeNacimiento}</p>
              <p><strong>Edad:</strong> {patient.edad} años</p>
            </div>

            <div className="mb-3">
              <h5>Información de Contacto</h5>
              <p><FaEnvelope className="me-2" />{patient.correoElectronico}</p>
              <p><FaPhone className="me-2" />{patient.telefono}</p>
            </div>

            <div className="mb-3">
              <h5>Información Médica</h5>
              <p><FaHeart className="me-2" /><strong>Estado de Salud:</strong> {patient.estadoDeSalud}</p>
              <p><strong>Aseguradora:</strong> {patient.aseguradora}</p>
              <p><strong>Fecha de Registro:</strong> {patient.fechaDeRegistro}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
    <Modal.Footer className="d-flex justify-content-end">
      <div className="d-flex gap-2">
        <Button variant="secondary" onClick={onHide} style={{ width: '100px' }}>
        Cerrar
        </Button>
        <Button variant="primary" href="/historial">
        Ver Historial 
        </Button>
        <Button variant="primary" href="/agendar-cita">
        Nueva Cita
        </Button>
      </div>
    </Modal.Footer>
    </Modal>
  );
};

const PatientsPage: React.FC = () => {
  // Sample data - replace with actual API call later
  const samplePatients: Patient[] = [
    {
      id: 7,
      nombre: "Kenma",
      apellido: "Kozume",
      correoElectronico: "kenma@gmail.com",
      password: "12345",
      edad: 22,
      telefono: 3122342343,
      sexo: "Masculino",
      fechaDeNacimiento: "2002-08-21",
      aseguradora: "CooSalud",
      estadoDeSalud: "Saludable",
      fechaDeRegistro: "2024-11-11",
      rol: 2
    },
    {
      id: 8,
      nombre: "Shoyo",
      apellido: "Hinata",
      correoElectronico: "hinata@gmail.com",
      password: "12345",
      edad: 21,
      telefono: 3157834562,
      sexo: "Masculino",
      fechaDeNacimiento: "2003-06-21",
      aseguradora: "Nueva EPS",
      estadoDeSalud: "En Tratamiento",
      fechaDeRegistro: "2024-10-15",
      rol: 2
    },
    {
      id: 9,
      nombre: "Kiyoko",
      apellido: "Shimizu",
      correoElectronico: "kiyoko@gmail.com",
      password: "12345",
      edad: 24,
      telefono: 3167834562,
      sexo: "Femenino",
      fechaDeNacimiento: "2000-01-06",
      aseguradora: "Sura",
      estadoDeSalud: "Saludable",
      fechaDeRegistro: "2024-09-20",
      rol: 2
    }
  ];

  const [patients] = useState<Patient[]>(samplePatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Saludable': 'success',
      'En Tratamiento': 'warning',
      'En Observación': 'info'
    };
    return <Badge bg={variants[status as keyof typeof variants] || 'secondary'}>{status}</Badge>;
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Lista de Pacientes</h2>
          <Button variant="primary" href="/agregar-paciente">
            Agregar Paciente
          </Button>
        </Card.Header>
        <Card.Body>
          <Table hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Estado de Salud</th>
                <th>Edad</th>
                <th>Aseguradora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} style={{ cursor: 'pointer' }}>
                  <td>{patient.id}</td>
                  <td>{`${patient.nombre} ${patient.apellido}`}</td>
                  <td>{getStatusBadge(patient.estadoDeSalud)}</td>
                  <td>{patient.edad}</td>
                  <td>{patient.aseguradora}</td>
                  <td>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => handlePatientClick(patient)}
                    >
                      Ver Detalles
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {selectedPatient && (
        <PatientDetail
          patient={selectedPatient}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      )}
    </Container>
  );
};

export default PatientsPage;
