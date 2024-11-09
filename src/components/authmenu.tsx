import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AuthMenu() {
  const [isLogin, setIsLogin] = useState(true);
  const [birthdate, setBirthdate] = useState(null); // State for birthdate
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
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
      {isLogin ? (
        <>
          <h5 className="mb-4">Iniciar sesión</h5>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" placeholder="Ingrese su correo" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
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
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formBasicName" className="mb-3">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control type="text" placeholder="Ingrese su nombre" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control type="email" placeholder="Ingrese su correo" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Ingrese contraseña" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formBirthdate" className="mb-3">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control type="date" placeholder="Ingrese su número" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formBasicPhone" className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control type="number" placeholder="Ingrese su número" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formBasicAseguradora" className="mb-3">
                  <Form.Label>Aseguradora</Form.Label>
                  <Form.Control type="text" placeholder="Ingrese su aseguradora" />
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
