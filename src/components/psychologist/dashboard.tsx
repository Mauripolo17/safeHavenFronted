import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function Dashboard() {
  const navigate = useNavigate();
  return (
    <Container className="mt-5">
      <h2>¿Qué desea hacer?</h2>
      <Row className="mt-4">
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Agendar Cita</Card.Title>
              <Card.Text>
                Programa una cita con uno de nuestros pacientes.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/agendar-cita-psicologo')}>
                Agendar Cita
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Ver Pacientes</Card.Title>
              <Card.Text>
                Revisar la información de los pacientes de SafeHaven.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/pacientes')}>
                Ver Pacientes
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Perfil</Card.Title>
              <Card.Text>
                Accede a tu perfil para ver y editar tu información.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/perfil')}>
                Ir a Perfil
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default Dashboard;
