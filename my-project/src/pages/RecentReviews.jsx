import React from "react";
import { useState, useEffect } from "react";
import MovieCardcopy from "../components/MovieCardcopy";

import { Link } from "react-router-dom";
import Loading from "../components/Loading";

import { db } from "../firebase/config";
import {
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";

const RecentReviews = () => {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const q = query(
        collection(db, "movies"),
        where("timestamp", "!=", null),
        orderBy("timestamp", "desc"),
        limit(20)
      );
      const querySnapshot = await getDocs(q);

      const moviesData = [];
      querySnapshot.forEach((doc) => {
        moviesData.push({ id: doc.id, ...doc.data() });
      });

      setMovieData(moviesData);
      setIsLoading(false);
    };

    fetchMovies();
  }, []);
  return (
    <>
      <div className='container items-center mx-auto'>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 p-4 justify-between '>
          {isLoading ? (
            <Loading />
          ) : movieData === null ? ( // Handle the null case
            <Loading />
          ) : movieData.length > 0 ? (
            movieData.map((movie, index) => (
              <Link
                key={movie.id}
                to={`/details/${movie.id}`}
                className='flex items-center min-w-full'
              >
                <MovieCardcopy
                  key={index}
                  image={movie.image}
                  title={movie.title}
                  movie={movie}
                />
              </Link>
            ))
          ) : (
            <h1 className='font-bold text-3xl'>No Results</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default RecentReviews;
