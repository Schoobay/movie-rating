import React from "react";
import MovieCard from "../components/MovieCard";
import MovieCardcopy from "../components/MovieCardcopy";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

import { db } from "../firebase/config";
import { getDocs, collection, query, limit, where } from "firebase/firestore";

import { useSearchContext } from "../hooks/SearchContext";

const Home = () => {
  const { searchQuery } = useSearchContext();
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const q = query(collection(db, "movies"), limit(800));
      const querySnapshot = await getDocs(q);

      const moviesData = [];
      querySnapshot.forEach((doc) => {
        moviesData.push({ id: doc.id, ...doc.data() });
      });

      let filteredMovies = moviesData;

      if (searchQuery) {
        filteredMovies = moviesData.filter((movie) =>
          movie.title && searchQuery
            ? movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            : false
        );
      }

      setMovieData(filteredMovies);
      setIsLoading(false);
    };

    fetchMovies();
  }, [searchQuery]);

  useEffect(() => {
    if (movieData) {
    }
  }, [movieData]);

  return (
    <>
      <div className='container items-center mx-auto bg'>
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

export default Home;
