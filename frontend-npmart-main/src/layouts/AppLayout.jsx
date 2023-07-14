import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
import Footer from "../pages/Footer";
import BackToTop from "../components/BackToTop";
import BottomFooter from "../components/BottomFooter";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <BackToTop />
      <Footer />
      <BottomFooter />
    </>
  );
};
export default AppLayout;
