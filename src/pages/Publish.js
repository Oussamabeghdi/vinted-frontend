import { Navigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import PublishField from "../components/PublishField";
import axios from "axios";
import "../styles/pages/Publish.css";

const Publish = ({ token }) => {
  const [pictures, setPictures] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setPictures(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  // on récupère les props de la fonction useDropzone
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      pictures.forEach((picture) => {
        formData.append("picture", picture);
      });

      const response = await axios.post(
        // "http://localhost:3000/offer/publish",

        // "https://lereacteur-vinted-api.herokuapp.com/offer/publish",

        "https://site--vinted-backend--9gtnl5qyn2yw.code.run/offer/publish",

        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return token ? (
    <div className="publish-wrapper">
      <div className="publish-content">
        <h1 className="publish-title">Vends ton article</h1>
        <form className="publish-form" onSubmit={handleSubmit}>
          <div className="publish-box-form publish-form-picture">
            <div className="dropzone" {...getRootProps()}>
              <input {...getInputProps()} accept="images/*" multiple={false} />
              {pictures.length ? (
                <div>
                  {pictures.map((file) => (
                    <div key={file.name}>
                      <img src={file.preview} alt="preview" />
                      <p>{file.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <button className="dropzone-button">
                  <span className="publish-outline">+</span> Ajouter une photo
                </button>
              )}
            </div>
          </div>

          <div className="publish-box-form publish-form-description">
            <PublishField
              className="publishfield-title"
              title={"Titre"}
              placeholder="ex: Chemise Sézane verte"
              state={title}
              setState={setTitle}
            />
            <PublishField
              className="publishField-textarea"
              textArea
              placeholder="ex: porté quelquefois, taille correctement"
              title={"Décrits ton article"}
              state={description}
              setState={setDescription}
            />
          </div>

          <div className="publish-box-form publish-form-details">
            <PublishField
              placeholder="ex: Zara"
              title={"Marque"}
              state={brand}
              setState={setBrand}
            />
            <PublishField
              title={"Taille"}
              placeholder="ex: L/40/12"
              state={size}
              setState={setSize}
            />
            <PublishField
              title={"Couleur"}
              placeholder="ex: Noir"
              state={color}
              setState={setColor}
            />
            <PublishField
              placeholder="Neuf avec étiquette"
              title={"Etat"}
              state={condition}
              setState={setCondition}
            />
            <PublishField
              title={"Lieu"}
              placeholder="ex: France"
              state={city}
              setState={setCity}
            />
          </div>
          <div className="publish-box-form publish-form-price">
            <PublishField
              title={"Prix"}
              placeholder="0,00 €"
              state={price}
              setState={setPrice}
            />
          </div>
          <input className="submit" type="submit" value="Publier l'offre" />
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
export default Publish;
