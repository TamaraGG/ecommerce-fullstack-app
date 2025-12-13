import AddToCartButton from "./cart/AddToCartButton";
import image from "../assets/default.png";

function ProductCard({ product }) {
  const productImage = product.imageBase64 ? product.imageBase64 : image;

  return (
    <>
      {product && (
        <div>
          <img src={productImage} alt="" width="200px" />
          <h1>{product?.name || "(Product Name)"}</h1>
          <h2>{product?.price.toFixed(2) || "unknown"}</h2>
          <p>Category: {product?.category || "unknown"}</p>
          <p>Description: {product?.description || "No description"}</p>
          <p>In stock: {product?.quantity || "unknown"}</p>
          <p>
            Rating:{" "}
            {product?.averageRating.toFixed(2) + " / 5.00" || "No ratings"}
          </p>

          {product.specs && (
            <div>
              <h3>Specifications:</h3>
              <ul>
                {Object.entries(product.specs).map((spec) => (
                  <li key={spec[0]}>
                    <b>{spec[0]}</b> : {spec[1]}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <AddToCartButton product={product} />
        </div>
      )}
    </>
  );
}

export default ProductCard;
