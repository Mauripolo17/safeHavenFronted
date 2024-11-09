import React from 'react';
import { Container, Card, Table, Badge, Button } from 'react-bootstrap';

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
  const userInfo: UserInfo = {
    nombre: "Diomedes Díaz",
    edad: 28
  };

  const personalHistory: HistorialRecord[] = [
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
  ];

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

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="mb-0">Mi Historial Médico</h3>
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
    </Container>
  );
};

export default PersonalHistoryPage;
