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
    <div className="header-content">
      <form onSubmit={handleSearch}>
        <img
          style={{ height: 100, width: 100 }}
          src="https://www.vinted.fr/assets/web-logo/default/logo.svg"
          alt=""
        ></img>
        <input
          className="searchBox"
          value={search}
          type="text"
          placeholder="Recherche des articles"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};
export default SearchBar;
