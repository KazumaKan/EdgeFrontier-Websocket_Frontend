import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Buttons from "../Button/Button";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <NavBar /> 
      <Buttons />
      <main>
        <div className="px-4 md:px-6 pt-12 pb-24 w-full xl:w-[45%] space-y-6">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
