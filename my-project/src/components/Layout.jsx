import Navbar from "./Navbar";
import Navbarcopy from "./Navbarcopy";
import { Outlet } from "react-router-dom";

//  Layout
const Layout = () => {
  return (
    <>
      <Navbarcopy />
      <main className='items-center'>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
