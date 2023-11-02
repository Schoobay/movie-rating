import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSearchContext } from "../hooks/SearchContext";
import { firebaseConfig } from "../firebase/config";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const app = initializeApp(firebaseConfig);

const Navbar = () => {
  const { searchQuery, setSearch } = useSearchContext();
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    navigate("/");
    event.preventDefault();
    setSearch(inputValue);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate("/sign-in"); // Redirect to sign-in page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleHomeClick = () => {
    setSearch(null);
    setInputValue("");
    navigate("/");
  };
  return (
    <>
      <nav className=' border-gray-200 bg-gray-900'>
        <div className='container  md:justify-between mx-auto py-3 px-10 font-bold flex md:flex-row flex-col items-center'>
          <ul className=' sm:pl-5 sm:pr-2 flex flex-row divide-x'>
            <li
              onClick={handleHomeClick}
              className='p-2 text-xl hover:text-primary-400 cursor-pointer'
            >
              Home
            </li>

            <Link to='/add-movie'>
              <li className='p-2 text-xl hover:text-primary-400 cursor-pointer whitespace-nowrap'>
                Add Movie
              </li>
            </Link>
            <Link to='recent-reviews'>
              <li className='p-2 text-xl hover:text-primary-400 cursor-pointer whitespace-nowrap'>
                Recent Reviews
              </li>
            </Link>
          </ul>
          <div className='mx-auto sm:pl-8 py-3  flex flex-row md:justify-end justify-between'>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='Search...'
                className='w-full rounded-lg bg-slate-100 text-slate-500 p-2 hover:placeholder:text-primary-400 inline'
                value={inputValue}
                onChange={handleInputChange}
              />
            </form>
            {/* <button
              onClick={handleLogout}
              className='bg-orange-500 rounded-full py-2 px-3 inline ml-8'
            >
              Logout
            </button> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
