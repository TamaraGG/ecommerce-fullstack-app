import CartButton from "../cart/CartButton";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";

function Header() {
  return (
    <>
      <header className="site-header">
        <div class="logo">
          <img src="" width="75px"></img>
        </div>
        <SearchBar />
        <nav>
          <ul>
            <li>
              <Link to="/">Main Page</Link>
            </li>
            <li>
              <Link to="/">Add Product</Link>
            </li>
            <li>
              <CartButton />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
