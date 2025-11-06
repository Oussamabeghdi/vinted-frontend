import "../styles/components/SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ search, setSearch }) => {
  const handleSearch = (event) => {
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
          placeholder="Rechercher des articles"
          onChange={handleChange}
        />
        <FontAwesomeIcon className="fa-solid" icon="fa-solid fa-magnifying-glass" />
      </form>
    </div>
  );
};
export default SearchBar;
