import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Badge, Button, Modal } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaIdCard, FaHeart } from 'react-icons/fa';
import { patientService, Patient } from '../../api/patientService';

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
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const data = await patientService.getAllPatients();
      setPatients(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los pacientes. Por favor, intente nuevamente más tarde.");
      console.error("Error loading patients:", err);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

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
