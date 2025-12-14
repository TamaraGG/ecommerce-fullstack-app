import CartButton from "../cart/CartButton";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import { useCart } from "../../hooks/useCart";

function Header() {
  const { totalItems } = useCart();

  return (
    <>
      <header className="header">
        <div className="logo">
          <a href="#">{/* <img src="" alt="" width="75px"></img> */}</a>
        </div>

        <SearchBar />
        <ul id="navbar">
          <li>
            <Link className="active" to="/">
              Main Page
            </Link>
          </li>
          <li>
            <Link to="/">Add Product</Link>
          </li>
          <li>
            <Link to="/cart">
              <i className="fa fa-shopping-basket" aria-hidden="true"></i>
              Cart ({totalItems})
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
