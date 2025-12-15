import React, { useEffect, useState, memo } from "react";
import styles from "../../styles/SortControls.module.css";

function SortControls({ currentSort, onSortChange, sortingOptions }) {
  // const [selectedSort, setSelectedSort] = useState({
  //   value: `${currentSort ? currentSort.split(",", 2)[0] : sortingOptions[0]}`,
  //   direction: `${currentSort ? currentSort.split(",", 2)[1] : "asc"}`,
  // });

  const [currentField, currentDirection] = currentSort
    ? currentSort.split(",")
    : [sortingOptions[0], "asc"];

  const handleFieldChange = (event) => {
    const newField = event.target.value;
    onSortChange(`${newField},${currentDirection}`);
  };

  const handleDirectionChange = (event) => {
    const newDirection = event.target.value;
    onSortChange(`${currentField},${newDirection}`);
  };

  // function handleChange(event) {
  //   setSelectedSort({
  //     ...selectedSort,
  //     direction: event.target.value,
  //   });
  // }
  // function handleSelectChange(event) {
  //   setSelectedSort({
  //     ...selectedSort,
  //     value: event.target.value,
  //   });
  // }

  // useEffect(() => {
  //   if (currentSort) {
  //     const [val, dir] = currentSort.split(",", 2);
  //     setSelectedSort({
  //       value: val,
  //       direction: dir || "asc",
  //     });
  //   }
  // }, [currentSort]);

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.group}>
          <label htmlFor="value" className={styles.label}>
            Sort by:
          </label>
          <select
            id="value"
            name="value"
            onChange={handleFieldChange}
            value={currentField}
            className={styles.select}
          >
            {sortingOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.radioGrup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="direction"
              value="asc"
              checked={currentDirection === "asc"}
              onChange={handleDirectionChange}
              className={styles.radioInput}
            />
            <span className={styles.radioText}>asc</span>
          </label>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="direction"
              value="desc"
              checked={currentDirection === "desc"}
              onChange={handleDirectionChange}
              className={styles.radioInput}
            />
            <span className={styles.radioText}>desc</span>
          </label>
        </div>
        {/* <button
          type="button"
          onClick={() =>
            onSortChange(`${selectedSort.value},${selectedSort.direction}`)
          }
          className={styles.button}
        >
          Sort
        </button> */}
      </form>
    </div>
  );
}

export default memo(SortControls);
