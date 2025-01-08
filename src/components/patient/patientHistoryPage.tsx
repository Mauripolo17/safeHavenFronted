import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Table, Badge, Button, Modal } from 'react-bootstrap';
import { AuthContext } from '../../contexts/authcontext';
import { citaService, HistorialRecord } from '../../api/citasService';
import { Psychologist, psychologistService } from '../../api/psychologistService';



const PersonalHistoryPage: React.FC = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);
  const [personalHistory, setPersonalHistory] = useState<HistorialRecord[]>([]);
  const [psychologistNames, setPsychologistNames] = useState<{ [key: number]: string }>({});

  const authContext = useContext(AuthContext);
  const user = authContext ? authContext.user : null;

  const getPsychologistNameById = (id: number) => {
    console.log(id)
    return psychologistNames[id] || "Cargando..."; // Devuelve el nombre o "Cargando..." si no está disponible
  };
  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const citasData = await citaService.getCitasByPaciente(user?.id);
        setPersonalHistory(citasData);

      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchPsychologists = async () => {
      try {
        if (user?.id) {        
          const psychologists = await psychologistService.getAllPsychologists();
          const names = psychologists.reduce((acc, psicologo) => {
            acc[psicologo.id] = psicologo.nombre;
            return acc;
          }, {});
          console.log(names)
          setPsychologistNames(names);
        }
      } catch (error) {
        console.error("Error al obtener psicólogos:", error);
      }
    };
    
    if (user?.id) {
      fetchCitas();
      fetchPsychologists();
    }
  }, [user?.id]);

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
            <small className="text-muted">Bienvenido/a, {user.nombre}</small>
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
                    <td>{getPsychologistNameById(record.psicologo)}</td>
                    <td>{record.id==9?"Ansiedad":"Seguimiento"}</td>
                    <td>
                      <Badge bg={getBadgeVariant(record.id==9 || record.id ==10?"Completada": "Pendiente")}>
                        {record.id==9 || record.id ==10?"Completada": "Pendiente"}
                      </Badge>
                    </td>
                    <td>{record.comentarios}</td>
                    <td>
                      {record.id == 7 && (
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
