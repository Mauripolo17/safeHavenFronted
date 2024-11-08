import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import diomedesImg from "../assets/images/Diomedes.jpg";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <h2>Panel de control</h2>
      <Row className="mt-4">
        <Row className="mt-4">
            <Col md={12} className="text-center">
            <img
                src={diomedesImg}
                alt="Bienvenido"
                style={{
                width: "200px",
                height: "auto",
                marginBottom: "20px",
                }}
            />
            <h3>¡Hola, Diome! Estamos felices de tenerte aquí.</h3>
            </Col>
        </Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Agendar Cita</Card.Title>
              <Card.Text>
                Programa una cita con uno de nuestros profesionales.
              </Card.Text>
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
              <Card.Text>
                Consultar el historial de las citas y sesiones.
              </Card.Text>
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
