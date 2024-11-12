import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authcontext';

function Dashboard() {
  const authContext = useContext(AuthContext);
  const user = authContext ? authContext.user : null;
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <h2>Panel de control</h2>
      <Row className="mt-4">
        <Col md={12} className="text-center">
          <h3>Bienvenido, {user ? user.nombre : 'Invitado'}</h3>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Agendar Cita</Card.Title>
              <Card.Text>Programa una cita con uno de nuestros profesionales.</Card.Text>
              <Button variant="primary" onClick={() => navigate('/agendar-cita')}>
                Ir a Agendar Cita
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Ver Historial</Card.Title>
              <Card.Text>Consultar el historial de las citas y sesiones.</Card.Text>
              <Button variant="primary" onClick={() => navigate('/historial')}>
                Ver Historial
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Perfil</Card.Title>
              <Card.Text>Accede a tu perfil para ver y editar tu información.</Card.Text>
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
