import { useState } from "react";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ height: 150, border: "1px solid red", marginTop: 10 }}>
      <span>footer</span>
      <button
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
