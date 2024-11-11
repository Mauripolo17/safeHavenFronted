
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/style.css";
import Dropdown from "react-bootstrap/Dropdown";
import logoExtendido from "../assets/images/logo-extendido.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  }

  const handleLoginClick = () => {
    navigate("/login");
  }
  const margin = {
    marginRight: "100px",
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container" id="headerContainer">
          <img
            src={logoExtendido}
            className="SafeHaven"
            style={{
              width: "200px",
              height: "auto",
              marginBottom: "15px",
              marginTop: "10px",
            }}
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarNav"
            style={margin}
          >
            <ul className="navbar-nav ms-auto">
              <Dropdown className="me-4">
                <Dropdown.Toggle 
                  className="no-caret fs-5" 
                  variant="light" 
                  id="dropdown-basic"
                  onClick={handleHomeClick}>
                  Home
                </Dropdown.Toggle>
              </Dropdown>
              <Dropdown className="me-4">
                <Dropdown.Toggle className="no-caret fs-5" variant="light" id="dropdown-basic">
                  Servicios
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Citas</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Cursos de salud mental</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown className="me-4">
                <Dropdown.Toggle className="no-caret fs-5" variant="light" id="dropdown-basic">
                  Relevante
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate('/psicologos')}>Psicologos</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Nuestras sesiones</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Servicio de acompañamiento</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown className="me-4">
                <Dropdown.Toggle className="no-caret fs-5" variant="light" id="dropdown-basic">
                  Sobre nosotros
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Mision</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Contacto</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <button type="button" className="btn" id="buttonLogin" onClick={handleLoginClick} ><span id="loginText">Inicia sesion</span></button>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
