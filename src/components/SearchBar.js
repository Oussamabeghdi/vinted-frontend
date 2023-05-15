import "../styles/components/SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ search, setSearch }) => {
  const handleSearch = (event) => {
    // console.log("salut");
    event.preventDefault();
    setSearch(search);
  };
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="header-content">
      <form onSubmit={handleSearch}>
        <input
          className="searchBar"
          value={search}
          type="text"
          placeholder="  Recherche des articles"
          onChange={handleChange}
        />
      </form>
      <FontAwesomeIcon
        className="fa-solid"
        icon="fa-solid fa-magnifying-glass"
      />
    </div>
  );
};
export default SearchBar;
