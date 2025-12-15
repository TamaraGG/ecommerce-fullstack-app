import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/SearchBar.module.css";

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
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <input
          type="text"
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type to search..."
          className={styles.input}
          aria-label="Search products"
        />
      </div>

      <button onClick={handleSearch} className={styles.button}>
        search
      </button>
    </div>
  );
}

export default SearchBar;
