import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logoExtendido from "../assets/images/logo-extendido.png";
import doctor from "../assets/images/doctor.png";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    navigate("/singup");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores anteriores

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 200) {
        // Si las credenciales son correctas, redirigir al dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Credenciales incorrectas o usuario no encontrado.");
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
        <h5 className="mb-4">Iniciar sesión</h5>
        <Form onSubmit={handleLogin} id="formAuth">
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
          <Button type="submit" className="w-100 mt-3" id="buttonAuth">
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
      </div>
    </div>
  );
}

export default Login;
