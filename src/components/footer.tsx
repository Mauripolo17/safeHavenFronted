import "bootstrap/dist/css/bootstrap.min.css";

export const Footer = () => {
return(
    <>
    <div className="footer_section layout_padding">
      <div className="container">
         <div className="row" id="footerRow">
            <div className="col-lg-3 col-sm-6" id="help">
               <h1 className="adderss_text">¿Cómo podemos ayudar?</h1>
               <a href="" id="helpA"><div className="Useful_text">Beneficios</div></a>
               <a href="" id="helpA"><div className="Useful_text">Cursos de salud mental</div></a>
               <a href="" id="helpA"><div className="Useful_text">Preguntas psicólogo</div></a>
               <a href="" id="helpA"><div className="Useful_text">Preguntas citas</div></a>
            </div>
            <div className="col-lg-3 col-sm-4" id="help">
                <h1 className="adderss_text">Contact Us</h1>
                <div className="map_icon"><i className="fa-solid fa-location-dot"></i><span className="paddlin_left_0">Colombia, Santa Marta</span></div>
                <div className="map_icon"><i className="fa-solid fa-phone"></i><span className="paddlin_left_0">+57 3004567676</span></div>
                <div className="map_icon"><i className="fa-solid fa-envelope"></i><span className="paddlin_left_0">soporte@safehaven.com</span></div>
            </div>
            <div className="col-lg-3 col-sm-6" id="help">
               <h1 className="adderss_text">Mantente en contacto</h1>
               <div className="hiphop_text_1">Únete a nuestra revista, para que te lleguen las notificiones de todo lo que realizamos.</div>
               <input type="text" className="Enter_text" placeholder="E-mail Address" name="Enter your Emil" />
               <div className="subscribe_bt"><a href="#">Subscribe</a></div>
            </div>
         </div>
      </div>
   </div>

       
      <div className="copyright_section">
          <div className="container">
              <p className="copyright_text">©2024 safehaven.com</p>
          </div>
      </div>
      
    </>
);
}