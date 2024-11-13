import { useContext, useState, useRef } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import drBayterImg from "../../assets/images/dr-bayter.jpeg";
import drPechyImg from "../../assets/images/dr-pechy.png";
import drChuroImg from "../../assets/images/dr-churo.png";
import verificationImg from "../../assets/images/verification.png";
import { AuthContext } from "../../contexts/authcontext";
import { Toast } from "primereact/toast";
import "../../assets/styles/style.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

function AppointmentPage() {
  const authContext = useContext(AuthContext);
  const user = authContext ? authContext.user : null;
  const [selectedPsychologist, setSelectedPsychologist] = useState<{
    name: string;
    image: string;
  } | null>(null);
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);

  const [formData, setFormData] = useState({
    motivo: "",
    duracion: "01:00:00",
    fecha: "",
    hora: "",
    tipoCita: "",
    insertBy: user?.correoElectronico,
    paciente: user?.id,
    psicologo: 57,
    consultorio: 3,
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toast = useRef(null);

  const showError = (error: String) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 3000,
      className: "showError",
    });
  };

  const showSuccess = (msg: String) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: msg,
      life: 3000,
      className: "showSuccess",
    });
  };
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

  const [error, setError] = useState("");

  const handleRegisterCita = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(""); // Limpiar errores anteriores
    console.log(formData);

    if (
      !formData.duracion ||
      !formData.tipoCita ||
      !formData.fecha ||
      !formData.hora
    ) {
      showError("Todos los campos son obligatorios");
      setError("Todos los campos son obligatorios");
      return;
    }

    const newCita = {
      motivo: formData.motivo,
      duracion: formData.duracion,
      fecha: formData.fecha,
      hora: formData.hora,
      tipoCita: formData.tipoCita,
      insertBy: user?.correoElectronico,
      paciente: user?.id,
      psicologo: 57,
      consultorio: 3,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/citas",
        newCita
      );
      console.log("Cita registrada:", response.data);
      setAppointmentConfirmed(true);
      showSuccess("Cita registrada");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "Error desconocido";
      console.error("Error al registrar la cita:", errorMessage);
      showError(errorMessage);
      // setError("Error al registrar el paciente.");
    }
  };

  const handleSelectPsychologist = (psychologist: {
    name: string;
    image: string;
  }) => {
    setSelectedPsychologist(psychologist);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setAppointmentConfirmed(true);
  };

  return (
    <Container className="mt-5">
      <h2>Agendar Cita con un Psicólogo</h2>
      <Toast ref={toast} />
      <Row className="mb-4">
        {psychologists.map((psychologist, index) => (
          <Col md={4} key={index}>
            <Card
              style={{
                cursor: "pointer",
                border:
                  selectedPsychologist?.name === psychologist.name
                    ? "2px solid #007bff"
                    : "1px solid #ccc",
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
          <Row>
            <Col md={6}>
              <Form.Group controlId="formBasicMotivo" className="mb-3">
                <Form.Label>Motivo</Form.Label>
                <Form.Control
                  type="text"
                  name="motivo"
                  placeholder="Motivo de cita"
                  value={formData.motivo}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formBasicTipoDeCita" className="mb-3">
                <Form.Label>Tipo de cita</Form.Label>
                <Form.Select
                  name="tipoCita"
                  value={formData.tipoCita}
                  onChange={handleInputChange}
                  aria-label="Seleccionar tipo de cita"
                >
                  <option value="">Selecciona tipo de cita</option>
                  <option value="Individual">Individual</option>
                  <option value="Grupal">Grupal</option>
                  <option value="Pareja">Pareja</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formDate">
                <Form.Label>Seleccionar Fecha</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formTime">
                <Form.Label>Seleccionar Hora</Form.Label>
                <Form.Control
                  type="time"
                  name="hora"
                  value={formData.hora}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
          <Col md={6}>
          <Button
            variant="primary"
            id="SafeHavenButton"
            type="submit"
            disabled={!selectedPsychologist}
            onClick={handleRegisterCita}
          >
            Agendar Cita
          </Button>
          </Col>
          </Row>
        </Form>
      ) : (
        <div className="text-center mt-4">
          <img
            src={verificationImg}
            alt="Cita confirmada"
            style={{ width: "100px", height: "auto", marginBottom: "20px" }}
          />
          <h3>Cita correctamente asignada</h3>
          {selectedPsychologist && (
            <p>
              ¡Tu cita con {selectedPsychologist.name} ha sido confirmada
              exitosamente!
            </p>
          )}
          <Button
            variant="primary"
            onClick={() => setAppointmentConfirmed(false)}
          >
            Agendar otra cita
          </Button>
        </div>
      )}
    </Container>
  );
}

export default AppointmentPage;
