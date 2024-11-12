import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { FaStar, FaClock, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { psychologistService, Psychologist } from '../api/psychologistService.tsx';

const PsychologistDetail: React.FC<{
  psychologist: Psychologist;
  show: boolean;
  onHide: () => void;
}> = ({ psychologist, show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Perfil del Psicólogo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4}>
            <div className="text-center mb-3">
              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto" style={{ width: '150px', height: '150px', fontSize: '4rem' }}>
                <FaUser />
              </div>
            </div>
            <div className="mb-3">
              <h5>Calificación</h5>
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className="me-1"
                  color={index < 4 ? "#ffc107" : "#e4e5e9"}
                />
              ))}
            </div>
          </Col>
          <Col md={8}>
            <h3>{`${psychologist.nombre} ${psychologist.apellido}`}</h3>
            <h5 className="text-primary mb-3">{psychologist.especialidad}</h5>
            
            <div className="mb-3">
              <h5 className="mb-2">Información de Contacto</h5>
              <p>
                <FaEnvelope className="me-2" />
                {psychologist.correoElectronico}
              </p>
              <p>
                <FaPhone className="me-2" />
                {psychologist.telefono}
              </p>
            </div>

            <div className="mb-3">
              <h5 className="mb-2">
                <FaClock className="me-2" />
                Horario de Atención
              </h5>
              <p>{psychologist.horarioDeAtencion}</p>
            </div>

            <div className="mb-3">
              <h5>Experiencia Profesional</h5>
              <p>{psychologist.añosDeExperiencia} años de experiencia</p>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <Button variant="secondary" onClick={onHide} style={{ width: '100px' }}>
          Cerrar
        </Button>
        <Button variant="primary" href="/agendar-cita">
          Agendar Cita
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const PsychologistsPage: React.FC = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [selectedPsychologist, setSelectedPsychologist] = useState<Psychologist | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPsychologists();
  }, []);

  const loadPsychologists = async () => {
    try {
      setLoading(true);
      const data = await psychologistService.getAllPsychologists();
      setPsychologists(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los psicólogos. Por favor, intente nuevamente más tarde.");
      console.error("Error loading psychologists:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePsychologistClick = (psychologist: Psychologist) => {
    setSelectedPsychologist(psychologist);
    setShowModal(true);
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
      <h2 className="mb-4">Nuestros Psicólogos</h2>
      <Row>
        {psychologists.map((psychologist) => (
          <Col key={psychologist.id} md={4} className="mb-4">
            <Card className="h-100">
              <div className="text-center pt-3">
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto" style={{ width: '100px', height: '100px', fontSize: '2.5rem' }}>
                  <FaUser />
                </div>
              </div>
              <Card.Body>
                <Card.Title>{`${psychologist.nombre} ${psychologist.apellido}`}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {psychologist.especialidad}
                </Card.Subtitle>
                <div className="mb-2">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className="me-1"
                      color={index < 4 ? "#ffc107" : "#e4e5e9"}
                    />
                  ))}
                </div>
                <Card.Text>
                  <FaClock className="me-2" />
                  {psychologist.horarioDeAtencion}
                </Card.Text>
                <Card.Text>
                  <small className="text-muted">
                    Experiencia: {psychologist.añosDeExperiencia} años
                  </small>
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handlePsychologistClick(psychologist)}
                >
                  Ver Perfil Completo
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedPsychologist && (
        <PsychologistDetail
          psychologist={selectedPsychologist}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      )}
    </Container>
  );
};

export default PsychologistsPage;
