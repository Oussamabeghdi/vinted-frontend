import { Navigate } from "react-router-dom";
import { useState } from "react";
import CustomInput from "../components/CustomInput";
import axios from "axios";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

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
      formData.append("picture", picture);

      const response = await axios.post(
        "http://localhost:3000/offer/publish",
        // "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        // "https://site--vinted-backend--9gtnl5qyn2yw.code.run/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(token);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return token ? (
    <div className="publish-container">
      <form onSubmit={handleSubmit}>
        <h2>Vends ton article</h2>
        <div className="picture">
          <input
            style={{
              width: "400px",
              height: "100px",
              border: "2px solid green",
            }}
            type="file"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
          />
          {picture && (
            <img
              style={{ width: "200px", height: "200px" }}
              src={URL.createObjectURL(picture)}
              alt="product"
            />
          )}
        </div>

        <div className="input-container-title-description">
          <CustomInput title={"Titre"} state={title} setState={setTitle} />
          <CustomInput
            textArea
            title="Décrits ton article"
            state={description}
            setState={setDescription}
          />
        </div>

        <div className="input-container-b-s-c-c">
          <CustomInput
            className="input-title"
            title={"Marque"}
            state={brand}
            setState={setBrand}
          />
          <CustomInput title={"Taille"} state={size} setState={setSize} />
          <CustomInput title={"Couleur"} state={color} setState={setColor} />
          <CustomInput
            title={"Etat"}
            state={condition}
            setState={setCondition}
          />
          <CustomInput title={"Lieu"} state={city} setState={setCity} />
        </div>
        <div className="price-input">
          <CustomInput title={"Prix"} state={price} setState={setPrice} />
        </div>
        <input className="submit" type="submit" value="Publier l'offre" />
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
export default Publish;
