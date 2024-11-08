import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function AppointmentPage() {
  return (
    <Container className="mt-5">
      <h2>Agendar Cita con un Psicólogo</h2>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formPsychologist">
              <Form.Label>Seleccionar Psicólogo</Form.Label>
              <Form.Select>
                <option>Selecciona un psicólogo</option>
                <option>Dr. Bayter</option>
                <option>Dr. Pechy</option>
                <option>Dr. Churo</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formDate">
              <Form.Label>Seleccionar Fecha</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formTime">
              <Form.Label>Seleccionar Hora</Form.Label>
              <Form.Control type="time" />
            </Form.Group>
          </Col>
        </Row>
        
        <Button variant="primary" type="submit">
          Agendar Cita
        </Button>
      </Form>
    </Container>
  );
}

export default AppointmentPage;
