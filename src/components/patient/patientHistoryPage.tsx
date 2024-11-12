import React, { useState } from 'react';
import { Container, Card, Table, Badge, Button, Modal } from 'react-bootstrap';

interface HistorialRecord {
  id: number;
  fecha: string;
  psicologo: string;
  diagnostico: string;
  estado: 'Completada' | 'Cancelada' | 'Pendiente';
  comentarios: string;
}

interface UserInfo {
  nombre: string;
  edad: number;
}

const PersonalHistoryPage: React.FC = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);
  const [personalHistory, setPersonalHistory] = useState<HistorialRecord[]>([
    {
      id: 1,
      fecha: "2024-03-15",
      psicologo: "Dr. Bayter",
      diagnostico: "Ansiedad moderada",
      estado: "Completada",
      comentarios: "Mejora en manejo de estrés",
    },
    {
      id: 2,
      fecha: "2024-02-15",
      psicologo: "Dr. Bayter",
      diagnostico: "Ansiedad",
      estado: "Completada",
      comentarios: "Primera evaluación",
    },
    {
      id: 3,
      fecha: "2024-04-01",
      psicologo: "Dr. Pechy",
      diagnostico: "Seguimiento",
      estado: "Pendiente",
      comentarios: "Cita de seguimiento programada"
    }
  ]);

  const userInfo: UserInfo = {
    nombre: "Diomedes Díaz",
    edad: 28
  };

  const getBadgeVariant = (estado: string) => {
    switch (estado) {
      case 'Completada':
        return 'success';
      case 'Cancelada':
        return 'danger';
      case 'Pendiente':
        return 'warning';
      default:
        return 'primary';
    }
  };

  const handleCancelClick = (appointmentId: number) => {
    setSelectedAppointment(appointmentId);
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    if (selectedAppointment) {
      setPersonalHistory(prevHistory =>
        prevHistory.map(appointment =>
          appointment.id === selectedAppointment
            ? { ...appointment, estado: 'Cancelada' }
            : appointment
        )
      );
    }
    setShowConfirmModal(false);
    setSelectedAppointment(null);
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="mb-0">Mi Historial de Citas</h3>
            <small className="text-muted">Bienvenido/a, {userInfo.nombre}</small>
          </div>
          <Button variant="primary" href="/agendar-cita">
            Agendar Nueva Cita
          </Button>
        </Card.Header>
        <Card.Body>
          {personalHistory.length > 0 ? (
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Psicólogo</th>
                  <th>Diagnóstico</th>
                  <th>Estado</th>
                  <th>Comentarios</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {personalHistory.map(record => (
                  <tr key={record.id}>
                    <td>{new Date(record.fecha).toLocaleDateString('es-ES')}</td>
                    <td>{record.psicologo}</td>
                    <td>{record.diagnostico}</td>
                    <td>
                      <Badge bg={getBadgeVariant(record.estado)}>
                        {record.estado}
                      </Badge>
                    </td>
                    <td>{record.comentarios}</td>
                    <td>
                      {record.estado === 'Pendiente' && (
                        <Button
                          style={{ width: '140px' }} 
                          variant="outline-danger"
                          size="md"
                          onClick={() => handleCancelClick(record.id)}
                        >
                          Cancelar Cita
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center py-4">
              <h5>No tienes citas registradas</h5>
              <p>Agenda tu primera cita con uno de nuestros psicólogos</p>
              <Button variant="primary" href="/agendar-cita">
                Agendar Cita
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cancelación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que deseas cancelar esta cita? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Volver
          </Button>
          <Button variant="danger" onClick={handleConfirmCancel}>
            Sí, Cancelar Cita
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PersonalHistoryPage;
