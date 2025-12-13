import React, { useEffect, useState } from "react";

function SortControls({ currentSort, onSortChange, sortingOptions }) {
  const [selectedSort, setSelectedSort] = useState({
    value: `${currentSort ? currentSort.split(",", 2)[0] : sortingOptions[0]}`,
    direction: `${currentSort ? currentSort.split(",", 2)[1] : "asc"}`,
  });
  console.log(selectedSort, "---", currentSort);

  function handleChange(event) {
    setSelectedSort({
      ...selectedSort,
      direction: event.target.value,
    });
  }
  function handleSelectChange(event) {
    setSelectedSort({
      ...selectedSort,
      value: event.target.value,
    });
  }

  useEffect(() => {
    if (currentSort) {
      const [val, dir] = currentSort.split(",", 2);
      setSelectedSort({
        value: val,
        direction: dir || "asc",
      });
    }
  }, [currentSort]);

  return (
    <div>
      <form>
        <label>Sort by:</label>
        <select
          id="value"
          name="value"
          onChange={handleSelectChange}
          value={selectedSort.value}
        >
          {sortingOptions.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <div>
          <input
            type="radio"
            name="direction"
            value="asc"
            checked={selectedSort.direction === "asc"}
            onChange={handleChange}
          />{" "}
          asc
          <br />
          <input
            type="radio"
            name="direction"
            value="desc"
            checked={selectedSort.direction === "desc"}
            onChange={handleChange}
          />{" "}
          desc
        </div>
        <button
          type="button"
          onClick={() =>
            onSortChange(`${selectedSort.value},${selectedSort.direction}`)
          }
        >
          Sort
        </button>
      </form>
    </div>
  );
}

export default SortControls;
