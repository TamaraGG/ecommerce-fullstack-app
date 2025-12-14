import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import { useCart } from "../../hooks/useCart";
import styles from "../../styles/index.module.css";

function Header() {
  const { totalItems } = useCart();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logoWraapper}>
            <Link to="/" className={styles.logoLink}>
              {/* <img src="/logo.png" alt="Logo" className={styles.logoImg} /> */}
            </Link>
          </div>

          <div className={styles.searchWrapper}>
            <SearchBar />
          </div>

          <nav className={styles.nav}>
            <Link to="/" className={styles.link}>
              Main Page
            </Link>
            <Link to="/" className={styles.link}>
              Add Product
            </Link>
            <Link to="/cart" className={`${styles.link} ${styles.cartLink}`}>
              <span className={styles.icon}>🛒</span>
              <span>Cart ({totalItems})</span>
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
