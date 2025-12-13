import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SearchBar() {
  const [search, setSearch] = useState(``);
  const navigate = useNavigate();

  const searchClicked = function () {
    if (search) {
      navigate(`search?${search}`);
    }
  };

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?pattern=${search}`);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <label>
        Search:
        <input
          type="text"
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type to search..."
        />
      </label>
      <button onClick={handleSearch}>search</button>
    </div>
  );
}

export default SearchBar;
