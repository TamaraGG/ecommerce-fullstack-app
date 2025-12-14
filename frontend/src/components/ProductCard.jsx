import AddToCartButton from "./cart/AddToCartButton";
import image from "../assets/default.png";

function ProductCard({ product }) {
  const productImage = product.imageBase64 ? product.imageBase64 : image;

  return (
    <>
      {product && (
        <div className={styles.container}>
          <div className={styles.topSection}>
            <div className={styles.imageWrapper}>
              <img
                src={productImage}
                alt={product?.name}
                className={styles.image}
              />
            </div>
            <div className={styles.mainInfo}>
              <h1>{product?.name || "(Product Name)"}</h1>
              <h2>{product?.price.toFixed(2) ?? "unknown"}</h2>
              <div className={styles.metaInfo}>
                <p>Category: {product?.category || "unknown"}</p>

                <p>In stock: {product?.quantity ?? "unknown"}</p>
                <p>
                  Rating: {product?.averageRating ?? "no ratings"} (reviews:{" "}
                  {product?.reviewCount ?? "no reviews"})
                </p>
              </div>
              <div className={styles.actions}>
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>

          <div className={styles.detailsSection}>
            <div className={styles.descriptionBlock}>
              <p>Description: {product?.description || "No description"}</p>
            </div>
          </div>

          {product.specs && (
            <div className={styles.specsBlock}>
              <h3>Specifications:</h3>
              <ul className={styles.specsList}>
                {Object.entries(product.specs).map((spec) => (
                  <li key={spec[0]} className={styles.specsItem}>
                    <span className={styles.specName}>{spec[0]}</span> :{" "}
                    {spec[1]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProductCard;
