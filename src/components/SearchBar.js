// import { useState } from "react";
// import Offer from "../pages/Offer";

const SearchBar = ({ search, setSearch }) => {
  const handleSearch = (event) => {
    console.log("salut");
    event.preventDefault();
    setSearch(search);
  };
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        {/* <img
      style={{ height: 100, width: 100 }}
      src="../public/img/logovinted.png"
      alt=""
    ></img> */}
        <input
          style={{
            borderRadius: 10,
            width: 400,
            height: 30,
            justifyContent: "space-around",
          }}
          value={search}
          type="text"
          placeholder="Recherche des articles"
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSearch}>
          Search
        </button>
      </form>
    </div>
  );
};
export default SearchBar;
