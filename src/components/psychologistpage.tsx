import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { FaStar, FaGraduationCap, FaClock, FaMapMarkerAlt, FaLanguage } from 'react-icons/fa';
import drBayterImg from "../assets/images/dr-bayter.jpeg";
import drPechyImg from "../assets/images/dr-pechy.png";
import drChuroImg from "../assets/images/dr-churo.png";

interface Psychologist {
  id: number;
  nombre: string;
  imagen: string;
  especialidad: string;
  experiencia: string;
  descripcionCorta: string;
  descripcionCompleta: string;
  educacion: string[];
  horario: string;
  precio: string;
}

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
            <img
              src={psychologist.imagen}
              alt={psychologist.nombre}
              className="img-fluid rounded mb-3"
            />
            <div className="mb-3">
              <h5 className="mb-2">Calificación</h5>
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className="me-1"
                  color={index < psychologist.calificacion ? "#ffc107" : "#e4e5e9"}
                />
              ))}
            </div>
            <div className="mb-3">
              <h5>Precio por sesión</h5>
              <p className="text-primary fw-bold">{psychologist.precio}</p>
            </div>
          </Col>
          <Col md={8}>
            <h3>{psychologist.nombre}</h3>
            <h5 className="text-primary mb-3">{psychologist.especialidad}</h5>
            
            <div className="mb-3">
              <h5 className="mb-2">Sobre mí</h5>
              <p>{psychologist.descripcionCompleta}</p>
            </div>

            <div className="mb-3">
              <h5 className="mb-2">
                <FaGraduationCap className="me-2" />
                Educación
              </h5>
              <ul className="list-unstyled">
                {psychologist.educacion.map((edu, index) => (
                  <li key={index} className="mb-1">{edu}</li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <h5 className="mb-2">
                <FaClock className="me-2" />
                Horario de Atención
              </h5>
              <p>{psychologist.horario}</p>
            </div>

            <div className="mb-3">
            </div>
            <div className="mb-3">
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
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
  const [selectedPsychologist, setSelectedPsychologist] = useState<Psychologist | null>(null);
  const [showModal, setShowModal] = useState(false);

  const psychologists: Psychologist[] = [
    {
      id: 1,
      nombre: "Dra. Bayter González",
      imagen: drBayterImg,
      especialidad: "Psicología Clínica",
      calificacion: 4,
      experiencia: "15 años",
      descripcionCorta: "Especialista en terapia cognitivo-conductual y manejo de ansiedad",
      descripcionCompleta: "Soy un psicólogo clínica con más de 15 años de experiencia, especializado en el tratamiento de trastornos de ansiedad y depresión. Mi enfoque combina la terapia cognitivo-conductual con técnicas de mindfulness para proporcionar un tratamiento integral y efectivo.",
      educacion: [
        "Doctorado en Psicología Clínica - Universidad Nacional",
        "Maestría en Terapia Cognitivo-Conductual - Universidad Europea",
        "Certificación en Mindfulness y Psicoterapia"
      ],
      horario: "Lunes a Viernes: 8:00 AM - 6:00 PM",
      precio: "$150.000 COP"
    },
    {
      id: 2,
      nombre: "Dr. Pechy Ramírez",
      imagen: drPechyImg,
      especialidad: "Psicología Infantil",
      calificacion: 5,
      experiencia: "10 años",
      descripcionCorta: "Experto en desarrollo infantil y terapia familiar",
      descripcionCompleta: "Me especializo en el trabajo con niños y adolescentes, ayudándoles a desarrollar habilidades sociales y emocionales. También trabajo con familias para mejorar la comunicación y resolver conflictos.",
      educacion: [
        "Maestría en Psicología Infantil - Universidad de Barcelona",
        "Especialización en Terapia Familiar Sistémica"
      ],
      horario: "Lunes a Sábado: 9:00 AM - 5:00 PM",
      precio: "$130.000 COP"
    },
    {
      id: 3,
      nombre: "Dra. Churo Martínez",
      imagen: drChuroImg,
      especialidad: "Psicología Organizacional",
      calificacion: 5,
      experiencia: "12 años",
      descripcionCorta: "Especialista en desarrollo profesional y manejo del estrés laboral",
      descripcionCompleta: "Como psicólogo organizacional, me dedico a ayudar a profesionales a alcanzar su máximo potencial en el ambiente laboral. Me especializo en manejo del estrés, desarrollo de liderazgo y mejora del desempeño.",
      educacion: [
        "MBA con énfasis en Psicología Organizacional",
        "Certificación en Coaching Ejecutivo"
      ],
      horario: "Martes a Sábado: 10:00 AM - 7:00 PM",
      precio: "$140.000 COP"
    },
    {
      id: 4,
      nombre: "Dr. Jorge Pérez",
      imagen: drBayterImg,
      especialidad: "Neuropsicología",
      calificacion: 5,
      experiencia: "18 años",
      descripcionCorta: "Experto en evaluación y rehabilitación neuropsicológica",
      descripcionCompleta: "Especializado en la evaluación y tratamiento de problemas cognitivos y conductuales relacionados con lesiones cerebrales y trastornos neurológicos. Amplia experiencia en rehabilitación cognitiva.",
      educacion: [
        "Doctorado en Neuropsicología Clínica",
        "Especialización en Rehabilitación Neuropsicológica"
      ],
      horario: "Lunes a Viernes: 7:00 AM - 4:00 PM",
      precio: "$160.000 COP"
    },
    {
      id: 5,
      nombre: "Dra. Carlos Silva",
      imagen: drPechyImg,
      especialidad: "Psicología del Deporte",
      calificacion: 4,
      experiencia: "8 años",
      descripcionCorta: "Especialista en rendimiento deportivo y motivación",
      descripcionCompleta: "Me dedico a ayudar a deportistas a alcanzar su máximo potencial, trabajando en aspectos como la motivación, el manejo de la presión y el establecimiento de metas. También trabajo con equipos deportivos.",
      educacion: [
        "Maestría en Psicología del Deporte",
        "Certificación en Coaching Deportivo"
      ],
      horario: "Lunes a Sábado: 6:00 AM - 8:00 PM",
      precio: "$145.000 COP"
    },
    {
      id: 6,
      nombre: "Dr. Ricardo Torres",
      imagen: drChuroImg,
      especialidad: "Terapia de Parejas",
      calificacion: 5,
      experiencia: "20 años",
      descripcionCorta: "Experto en terapia de parejas y relaciones interpersonales",
      descripcionCompleta: "Con más de 20 años de experiencia en terapia de parejas, me especializo en ayudar a resolver conflictos, mejorar la comunicación y fortalecer los vínculos afectivos. También trabajo con personas que están atravesando procesos de separación.",
      educacion: [
        "Doctorado en Psicología de las Relaciones",
        "Especialización en Terapia de Parejas",
        "Certificación en Mediación Familiar"
      ],
      horario: "Lunes a Viernes: 11:00 AM - 8:00 PM",
      precio: "$170.000 COP"
    }
  ];

  const handlePsychologistClick = (psychologist: Psychologist) => {
    setSelectedPsychologist(psychologist);
    setShowModal(true);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Nuestros Psicólogos</h2>
      <Row>
        {psychologists.map((psychologist) => (
          <Col key={psychologist.id} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={psychologist.imagen}
                alt={psychologist.nombre}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{psychologist.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {psychologist.especialidad}
                </Card.Subtitle>
                <div className="mb-2">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className="me-1"
                      color={index < psychologist.calificacion ? "#ffc107" : "#e4e5e9"}
                    />
                  ))}
                </div>
                <Card.Text>{psychologist.descripcionCorta}</Card.Text>
                <Card.Text>
                  <small className="text-muted">
                    Experiencia: {psychologist.experiencia}
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
