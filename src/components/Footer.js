import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import "../styles/components/Footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="column-links-ft">
          <h3>Vinted</h3>
          <ul>
            <li>À propos de Vinted</li>
            <li>Carrière</li>
            <li>Presse</li>
            <li>Publicités</li>
          </ul>
        </div>
        <div className="column-links-ft">
          <h3>Découvrir</h3>
          <ul>
            <li>À propos de Vinted</li>
            <li>Vendre</li>
            <li>Acheter</li>
            <li>Confiance et sécurité</li>
          </ul>
        </div>
        <div className="column-links-ft">
          <h3>Aide</h3>
          <ul>
            <li>Centre d'aide</li>
            <li>Carrière</li>
            <li>Presse</li>
            <li>Publicités</li>
          </ul>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-icon">
          <div>
            <FontAwesomeIcon icon={faInstagram} />
          </div>
          <div>
            <FontAwesomeIcon icon={faFacebook} />
          </div>
          <div>
            <FontAwesomeIcon icon={faLinkedin} />
          </div>
        </div>
        <div className="app-google-store-container">
          <div className="app-google-store"></div>
        </div>
      </section>
    </footer>
  );
};
export default Footer;
