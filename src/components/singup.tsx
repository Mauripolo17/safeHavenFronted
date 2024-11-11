import { useState, useRef } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logoExtendido from "../assets/images/logo-extendido.png";
import doctor from "../assets/images/doctor.png";
import { Toast } from "primereact/toast";
import "../assets/styles/style.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

function Singup() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    birthdate: "",
    edad: 0,
    sexo: "",
    phone: "",
    aseguradora: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const showError = (error:String) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 3000,
      className: "showError",
    });
  };
  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Usuario registrado",
      life: 3000,
      className: "showSuccess",
    });
  };
  const handleLoginClick = () => {
    navigate("/login");
  };

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(formData.birthdate);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores anteriores

    if (
      !formData.name ||
      !formData.lastname ||
      !formData.email ||
      !formData.password ||
      !formData.birthdate ||
      !formData.phone ||
      !formData.aseguradora ||
      !formData.sexo
    ) {
      showError("Todos los campos son obligatorios");
      // setError("Todos los campos son obligatorios");
      return;
    }

    const newPaciente = {
      nombre: formData.name,
      apellido: formData.lastname,
      correoElectronico: formData.email,
      password: formData.password,
      fechaDeNacimiento: formData.birthdate,
      telefono: formData.phone,
      aseguradora: formData.aseguradora,
      estadoDeSalud: "Saludable",
      sexo: formData.sexo,
      edad:calculateAge(formData.birthdate)
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/pacientes",
        newPaciente
      );

      console.log("Paciente registrado:", response.data);
      showSuccess();

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || "Error desconocido";
      console.error("Error al registrar el paciente:", errorMessage);
      showError(errorMessage)
      // setError("Error al registrar el paciente.");
    }
  };

  return (
    <div id="loginMenu">
      {error && <Alert variant="danger">{error}</Alert>}
      <div id="doctorContainer">
        <img src={logoExtendido} style={{ width: "60%" }} />
        <img src={doctor} style={{ width: "100%" }} />
      </div>
      <div id="loginContainer">
        <h5 className="mb-4">Registro</h5>
        <Form onSubmit={handleRegister} id="formAuth">
          <Row>
            <Col md={6}>
              <Form.Group controlId="formBasicName" className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Ingrese su nombre"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formBasicLastName" className="mb-3">
                <Form.Label>Apelido</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  placeholder="Ingrese su apellido"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Ingrese su correo"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Ingrese contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formBirthdate" className="mb-3">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formBasicPhone" className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Ingrese su número"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formBasicAseguradora" className="mb-3">
                <Form.Label>Aseguradora</Form.Label>
                <Form.Control
                  type="text"
                  name="aseguradora"
                  placeholder="Ingrese su aseguradora"
                  value={formData.aseguradora}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formBasicSexo" className="mb-3">
                <Form.Label>Sexo</Form.Label>
                <Form.Select
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleInputChange}
                  aria-label="Seleccionar sexo"
                >
                  <option value="">Selecciona el sexo</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Toast ref={toast} />
          <Button id="buttonAuth" type="submit" className="w-100 mt-3">
            Registrarse
          </Button>
        </Form>
        <p className="mt-3 text-center">
          ¿Ya tienes una cuenta?{" "}
          <span
            onClick={handleLoginClick}
            style={{ color: "#000", fontWeight: "bold", cursor: "pointer" }}
          >
            Inicia sesión aquí
          </span>
        </p>
      </div>
    </div>
  );
}

export default Singup;
