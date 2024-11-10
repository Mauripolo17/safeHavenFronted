import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

import drBayterImg from "../assets/images/dr-bayter.jpeg";
import drPechyImg from "../assets/images/dr-pechy.png";
import drChuroImg from "../assets/images/dr-churo.png";
import verificationImg from "../assets/images/verification.png";

function AppointmentPage() {
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);

  const psychologists = [
    {
      name: "Dr. Bayter",
      image: drBayterImg,
    },
    {
      name: "Dr. Pechy",
      image: drPechyImg,
    },
    {
      name: "Dr. Churo",
      image: drChuroImg,
    },
  ];

  const handleSelectPsychologist = (psychologist) => {
    setSelectedPsychologist(psychologist);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAppointmentConfirmed(true);
  };

  return (
    <Container className="mt-5">
      <h2>Agendar Cita con un Psicólogo</h2>

      <Row className="mb-4">
        {psychologists.map((psychologist, index) => (
          <Col md={4} key={index}>
            <Card
              style={{
                cursor: "pointer",
                border: selectedPsychologist?.name === psychologist.name ? "2px solid #007bff" : "1px solid #ccc",
                transition: "border-color 0.3s ease",
              }}
              onClick={() => handleSelectPsychologist(psychologist)}
            >
              <Card.Img
                variant="top"
                src={psychologist.image}
                style={{
                  height: "250px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>{psychologist.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedPsychologist && (
        <div className="mb-3">
          <h4>Psicólogo seleccionado: {selectedPsychologist.name}</h4>
        </div>
      )}

      {!appointmentConfirmed ? (
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formDate">
                <Form.Label>Seleccionar Fecha</Form.Label>
                <Form.Control type="date" required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formTime">
                <Form.Label>Seleccionar Hora</Form.Label>
                <Form.Control type="time" required />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" disabled={!selectedPsychologist}>
            Agendar Cita
          </Button>
        </Form>
      ) : (
        <div className="text-center mt-4">
          <img
            src={verificationImg}
            alt="Cita confirmada"
            style={{ width: "100px", height: "auto", marginBottom: "20px" }}
          />
          <h3>Cita correctamente asignada</h3>
          {selectedPsychologist && <p>¡Tu cita con {selectedPsychologist.name} ha sido confirmada exitosamente!</p>}
          <Button variant="primary" onClick={() => setAppointmentConfirmed(false)}>
            Agendar otra cita
          </Button>
        </div>
      )}
    </Container>
  );
}

export default AppointmentPage;
