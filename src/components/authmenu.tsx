import React, { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function AuthMenu() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    birthdate: '',
    phone: '',
    aseguradora: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores anteriores

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      
      if (response.status === 200) {
        // Si las credenciales son correctas, redirigir al dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Credenciales incorrectas o usuario no encontrado.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores anteriores

    if (!formData.name || !formData.email || !formData.password || !formData.birthdate || !formData.phone || !formData.aseguradora) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const newPaciente = {
      nombre: formData.name,
      correoElectronico: formData.email,
      password: formData.password,
      fechaDeNacimiento: formData.birthdate,
      telefono: formData.phone,
      aseguradora: formData.aseguradora,
      estadoDeSalud: "Saludable",
    };

    try {
      const response = await axios.post("http://localhost:8080/api/pacientes", newPaciente);
      console.log("Paciente registrado:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar el paciente:", error);
      setError("Error al registrar el paciente.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        width: isLogin ? "320px" : "600px",
        backgroundColor: "#b0c4de",
        color: "#fff",
        borderRadius: "8px",
      }}
    >
      {error && <Alert variant="danger">{error}</Alert>}
      
      {isLogin ? (
        <>
          <h5 className="mb-4">Iniciar sesión</h5>
          <Form onSubmit={handleLogin}>
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
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Iniciar sesión
            </Button>
          </Form>
          <p className="mt-3 text-center">
            ¿No tienes una cuenta?{" "}
            <span
              onClick={toggleAuthMode}
              style={{ color: "#000", fontWeight: "bold", cursor: "pointer" }}
            >
              Regístrate aquí
            </span>
          </p>
        </>
      ) : (
        <>
          <h5 className="mb-4">Registro</h5>
          <Form onSubmit={handleRegister}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formBasicName" className="mb-3">
                  <Form.Label>Nombre completo</Form.Label>
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
            </Row>
            <Row>
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
            </Row>
            <Row>
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
            </Row>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Registrarse
            </Button>
          </Form>
          <p className="mt-3 text-center">
            ¿Ya tienes una cuenta?{" "}
            <span
              onClick={toggleAuthMode}
              style={{ color: "#000", fontWeight: "bold", cursor: "pointer" }}
            >
              Inicia sesión aquí
            </span>
          </p>
        </>
      )}
    </div>
  );
}

export default AuthMenu;