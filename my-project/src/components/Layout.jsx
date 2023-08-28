import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

//  Layout
const Layout = () => {
  return (
    <>
      <Navbar />
      <main className='items-center'>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
