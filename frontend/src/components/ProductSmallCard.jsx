import { Link } from "react-router-dom";
import AddToCartButton from "./cart/AddToCartButton";
import image from "../assets/default.png";

function ProductSmallCard({ product }) {
  const link = "/products/" + product.id;
  const productImage = product.imageBase64 ? product.imageBase64 : image;

  return (
    <>
      <div>
        <Link to={link}>
          <h4>{product?.name || "(Product Name)"}</h4>
        </Link>
        <img src={productImage} alt="" width="100px" />
        <p>price: {product?.price.toFixed(2) ?? "unknown"}</p>
        <p>in stock: {product?.quantity ?? "unknown"}</p>
        <p>
          rating: {product?.averageRating ?? "no ratings"} (reviews:{" "}
          {product?.reviewCount ?? "no reviews"})
        </p>
        <AddToCartButton product={product} />
      </div>
    </>
  );
}

export default ProductSmallCard;
