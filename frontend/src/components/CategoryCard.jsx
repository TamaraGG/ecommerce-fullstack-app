import { Link } from "react-router-dom";
import image from "../assets/default.png";

function CategoryCard({ cat }) {
  const link = `products/?category=${cat.category}`;
  const catImage = cat.imageBase64 ? cat.imageBase64 : image;

  return (
    <>
      <div>
        <Link to={link}>
          <h4>{cat.category}</h4>
        </Link>
        <img src={catImage} alt="" width="75px" />
        <p>Number of products: {cat.count}</p>
      </div>
    </>
  );
}

export default CategoryCard;
