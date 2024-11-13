import { useContext, useState, useRef } from "react";
import { Form, Button, Container, Row, Col, Card, Table, Badge, Modal } from "react-bootstrap";
import { AuthContext } from "../../contexts/authcontext";
import { Toast } from "primereact/toast";
import { FaCalendarAlt, FaSearch } from 'react-icons/fa';

interface Appointment {
  id: number;
  paciente: number;
  nombrePaciente: string;
  fecha: string;
  hora: string;
  motivo: string;
  duracion: string;
  tipoCita: string;
  estado: 'Programada' | 'Cancelada' | 'Completada' | 'Reprogramada';
}

interface Patient {
  id: number;
  nombre: string;
  apellido: string;
  correoElectronico: string;
}

function PsychologistAppointmentPage() {
  const authContext = useContext(AuthContext);
  const user = authContext ? authContext.user : { id: 1, correoElectronico: "psicologo@example.com" };
  const toast = useRef(null);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, nombre: "Juan", apellido: "Perez", correoElectronico: "juan@example.com" },
    { id: 2, nombre: "Ana", apellido: "Gomez", correoElectronico: "ana@example.com" }
  ]);
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, paciente: 1, nombrePaciente: "Juan Perez", fecha: "2024-11-15", hora: "10:00", motivo: "Consulta inicial", duracion: "01:00:00", tipoCita: "Individual", estado: "Programada" }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isRescheduling, setIsRescheduling] = useState(false);

  const [formData, setFormData] = useState({
    motivo: "",
    duracion: "01:00:00",
    fecha: "",
    hora: "",
    tipoCita: "",
    insertBy: user.correoElectronico,
    paciente: null,
    psicologo: user.id,
    consultorio: 3,
  });

  // Toast notifications
  const showError = (error: string) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 3000,
    });
  };

  const showSuccess = (msg: string) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: msg,
      life: 3000,
    });
  };

  // Handle input changes
  const handleInputChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearchPatients = () => {
    setPatients(patients.filter((patient) => patient.nombre.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  const loadAppointments = () => {
  };

  const handleScheduleAppointment = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!selectedPatient) {
      showError("Por favor seleccione un paciente");
      return;
    }

    const newAppointment = {
      id: appointments.length + 1,
      ...formData,
      paciente: selectedPatient.id,
      nombrePaciente: `${selectedPatient.nombre} ${selectedPatient.apellido}`,
      estado: "Programada",
    };

    setAppointments([...appointments, newAppointment]);
    showSuccess("Cita agendada exitosamente");
    setShowScheduleForm(false);
    resetForm();
  };

  const handleRescheduleAppointment = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === selectedAppointment.id
          ? { ...appt, fecha: formData.fecha, hora: formData.hora, estado: 'Reprogramada' }
          : appt
      )
    );
    showSuccess("Cita reprogramada exitosamente");
    setIsRescheduling(false);
  };

  const handleCancelAppointment = (appointmentId: number) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === appointmentId ? { ...appt, estado: 'Cancelada' } : appt
      )
    );
    showSuccess("Cita cancelada exitosamente");
  };

  const resetForm = () => {
    setFormData({
      motivo: "",
      duracion: "01:00:00",
      fecha: "",
      hora: "",
      tipoCita: "",
      insertBy: user.correoElectronico,
      paciente: null,
      psicologo: user.id,
      consultorio: 3,
    });
    setSelectedPatient(null);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Programada': 'primary',
      'Cancelada': 'danger',
      'Completada': 'success',
      'Reprogramada': 'warning'
    };
    return <Badge bg={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  return (
    <Container className="mt-5">
      <Toast ref={toast} />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Citas</h2>
        <Button onClick={() => setShowScheduleForm(true)}>
          <FaCalendarAlt className="me-2" />
          Nueva Cita
        </Button>
      </div>

      {showScheduleForm && (
        <Card className="mb-4">
          <Card.Header>
            <h4>Agendar Nueva Cita</h4>
          </Card.Header>
          <Card.Body>
            {/* ToDo */}
          </Card.Body>
        </Card>
      )}

      <Card>
        <Card.Header>
          <h4>Citas Programadas</h4>
        </Card.Header>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.nombrePaciente}</td>
                  <td>{appointment.fecha}</td>
                  <td>{appointment.hora}</td>
                  <td>{appointment.tipoCita}</td>
                  <td>{getStatusBadge(appointment.estado)}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setIsRescheduling(true);
                        }}
                        disabled={appointment.estado === 'Cancelada' || appointment.estado === 'Completada'}
                      >
                        Reprogramar
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleCancelAppointment(appointment.id)}
                        disabled={appointment.estado === 'Cancelada' || appointment.estado === 'Completada'}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={isRescheduling} onHide={() => setIsRescheduling(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reprogramar Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-3">
          <Form onSubmit={handleRescheduleAppointment}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formNewDate" className="mb-3">
                  <Form.Label>Seleccionar Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formNewTime" className="mb-3">
                  <Form.Label>Seleccionar Hora</Form.Label>
                  <Form.Control
                    type="time"
                    name="hora"
                    value={formData.hora}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex gap-2">
              <Button variant="primary" type="submit">
                Confirmar
              </Button>
              <Button variant="secondary" onClick={() => setIsRescheduling(false)}>
                Cancelar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

    </Container>
  );
}

export default PsychologistAppointmentPage;
