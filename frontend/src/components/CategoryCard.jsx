import { Link } from "react-router-dom";
import image from "../assets/default.png";
import styles from "../styles/index.module.css";

function CategoryCard({ cat }) {
  const link = `products/?category=${cat.category}`;
  const catImage = cat.imageBase64 ? cat.imageBase64 : image;

  return (
    <>
      <div className={styles.card}>
        <Link to={link} className={styles.link}>
          <div className={styles.imageWrapper}>
            <img src={catImage} alt={cat.category} className={styles.image} />
          </div>

          <div className={styles.content}>
            <h4 className={styles.title}>{cat.category}</h4>
          </div>

          <p className={styles.info}>Number of products: {cat.count}</p>
        </Link>
      </div>
    </>
  );
}

export default CategoryCard;
