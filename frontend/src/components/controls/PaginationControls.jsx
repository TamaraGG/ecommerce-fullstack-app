import styles from "../../styles/PaginationControls.module.css";
import React, { memo } from "react";

function PaginationControls({ currentPage, totalPages, onPageChange }) {
  // if (totalPages <= 1) {
  //   return null;
  // }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.container}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.arrowButton}
      >
        &laquo;
      </button>

      <div className={styles.numbers}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            disabled={number === currentPage}
            className={`${styles.button} ${
              number === currentPage ? styles.active : ""
            }`}
          >
            {number}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.arrowButton}
      >
        &raquo;
      </button>
    </div>
  );
}

export default memo(PaginationControls);
