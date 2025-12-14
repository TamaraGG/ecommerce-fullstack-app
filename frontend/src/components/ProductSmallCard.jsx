import { Link } from "react-router-dom";
import AddToCartButton from "./cart/AddToCartButton";
import image from "../assets/default.png";
import styles from "../styles/index.module.css";

function ProductSmallCard({ product }) {
  const link = "/products/" + product.id;
  const productImage = product.imageBase64 ? product.imageBase64 : image;

  return (
    <>
      <div className={styles.card}>
        <Link to={link}>
          <div className={styles.imageWrapper}>
            <img
              src={productImage}
              alt={product?.name}
              className={styles.image}
            />
          </div>
          <h4 className={styles.title}>{product?.name || "(Product Name)"}</h4>

          <p className={styles.price}>
            price: {product?.price.toFixed(2) ?? "unknown"}
          </p>
          <div className={styles.meta}>
            <p>in stock: {product?.quantity ?? "unknown"}</p>
            <p>
              rating: {product?.averageRating ?? "no ratings"} (reviews:{" "}
              {product?.reviewCount ?? "no reviews"})
            </p>
          </div>
        </Link>
        <div className={styles.actions}>
          <AddToCartButton product={product} />
        </div>
      </div>
    </>
  );
}

export default ProductSmallCard;
