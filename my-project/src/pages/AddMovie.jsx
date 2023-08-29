import React from "react";
import { useState, useEffect } from "react";

import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const users = ["reuben", "patryk", "callum", "david", "evan", "shane", "neil"];

const renderRatingOptions = () => {
  const options = [];
  for (let i = 0.5; i <= 10; i += 0.5) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  return options;
};

const AddMovie = ({ userName }) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  useEffect(() => {
    setUser(userName);
  }, []);

  const handleAddMovie = async (event) => {
    event.preventDefault();

    if (!title || title.trim() === "") {
      {
        setTitleError(true);
      }
      return;
    }

    if (userName) {
      const querySnapshot = await getDocs(
        query(collection(db, "movies"), where("title", "==", title))
      );

      if (!querySnapshot.empty) {
        setError(true);
        return;
      }

      const movieData = {
        title,
        year: 2023,
        timestamp: serverTimestamp(),
      };

      users.forEach((user) => {
        movieData[user] = userName === user ? parseFloat(rating) : null;
      });

      try {
        const docRef = await addDoc(collection(db, "movies"), movieData);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
    }
  };
  return (
    <>
      <div className='container mx-auto flex flex-col justify-center max-w-md md:max-w-lg dark:bg-gray-900 p-8 rounded-lg shadow-2xl mt-3'>
        <h1 className='mx-auto font-bold text-5xl mb-3'>Add Movie</h1>
        <form onSubmit={handleAddMovie}>
          <label htmlFor='title' className='font-bold text-lg block'>
            Movie Title:
          </label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Example: Air'
            className='w-full rounded-lg bg-slate-100 text-slate-500 p-2 hover:placeholder:text-primary-400'
          />
          <label htmlFor='rating' className='font-bold text-lg block mt-4'>
            Your Rating:
          </label>
          <select
            id='rating'
            className='bg-slate-200 rounded-lg text-black mr-4'
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            {renderRatingOptions()}
          </select>
          <button className='bg-orange-500 rounded-full py-1 px-2'>Save</button>
        </form>
        <h3>Please use the title from IMDB website</h3>
        {error ? (
          <p className='text-center text-red-600 font-bold'>
            Movie Already Exists!
          </p>
        ) : titleError ? (
          <p className='text-center text-red-600 font-bold'>
            Please provide a title
          </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default AddMovie;
