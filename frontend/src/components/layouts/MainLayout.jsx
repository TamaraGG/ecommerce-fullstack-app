import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../../styles/index.module.css";

function MainLayout() {
  return (
    <div>
      <Header />

      <main>
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default MainLayout;
