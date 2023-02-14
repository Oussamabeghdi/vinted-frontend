// import { useState } from "react";

const Footer = ({ visible, setVisible }) => {
  // const [visible, setVisible] = useState(false);

  return (
    <div style={{ height: 100, marginTop: 10 }}>
      <button
        style={{ display: "none" }}
        onClick={() => {
          setVisible(!visible); // on inverse la valeur de `visible` à chaque click
        }}
      >
        Afficher/Masquer Modal
      </button>
    </div>
  );
};
export default Footer;
