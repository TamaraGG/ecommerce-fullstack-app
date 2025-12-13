import CartButton from "../cart/CartButton";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";

function Header() {
  return (
    <>
      <header>
        <SearchBar />
        <Link to="/">Main Page</Link>
        <CartButton />
      </header>
    </>
  );
}

export default Header;
