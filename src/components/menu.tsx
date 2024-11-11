import React, { useContext, useEffect, useState } from "react";
import logoBanner from "../assets/images/logo-banner.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/style.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authcontext";

function SafeHaven() {
  const authContext = useContext(AuthContext);
  const user = authContext ? authContext.user : null;
  const navigate = useNavigate();
  const [isUserReady, setIsUserReady] = useState(false);

  useEffect(() => {
    if (user !== null) {
      setIsUserReady(true);
    } else {
      setIsUserReady(true);
    }
  }, [user]);

  const handleRedirect = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  if (!isUserReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="banner_section">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 className="banner_taital" style={{ color: "#b0c4de" }}>
              Safe
              <br />
              <span style={{ color: "black" }}>Haven</span>
            </h1>
            <p className="banner_text">
              Bienvenido a SafeHaven, el lugar donde tu bienestar mental es lo más importante.
            </p>
            <div className="agendar-conocemas d-flex">
              <button
                type="button"
                className="btn btn-lg me-2"
                style={{ backgroundColor: '#b0c4de', color: '#fff' }}
                onClick={handleRedirect}
              >
                {user ? "Ir a mi Dashboard" : "Agendar cita"}
              </button>
              <button type="button" className="btn btn-lg ms-2">
                Conoce mas
              </button>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <div className="image_1 d-flex justify-content-center">
              <img src={logoBanner} style={{ width: "80%", marginTop: "60px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SafeHaven;
