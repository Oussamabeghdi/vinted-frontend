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
          className="searchBox"
          value={search}
          type="text"
          placeholder="  Recherche des articles"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};
export default SearchBar;
