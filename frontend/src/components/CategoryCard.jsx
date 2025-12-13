import { Link } from "react-router-dom";

function CategoryCard({ cat }) {
  const link = `products/?category=${cat.category}`;

  return (
    <>
      <div>
        <Link to={link}>
          <h4>{cat.category}</h4>
        </Link>
        <p>Number of products: {cat.count}</p>
      </div>
    </>
  );
}

export default CategoryCard;
