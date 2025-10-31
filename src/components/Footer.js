// import { useState } from "react";
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
          <div>Insta</div>
          <div>Facebook</div>
          <div>Linkdin</div>
        </div>
        <div className="app-google-store-container">
          <div className="app-google-store">
            <button className="app-store-button" type="button">
              App-store
            </button>
            <button className="google-play-button" type="button">
              Google-play
            </button>
          </div>
        </div>
      </section>
    </footer>
  );
};
export default Footer;
