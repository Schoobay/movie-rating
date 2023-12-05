import React from "react";
import MovieCard from "../components/MovieCard";
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
      if (!searchQuery) {
        const q = query(collection(db, "movies"), limit(10));
        const querySnapshot = await getDocs(q);

        const moviesData = [];
        querySnapshot.forEach((doc) => {
          moviesData.push({ id: doc.id, ...doc.data() });
        });

        const shuffledMovies = [...moviesData];
        for (let i = shuffledMovies.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledMovies[i], shuffledMovies[j]] = [
            shuffledMovies[j],
            shuffledMovies[i],
          ];
        }
        setMovieData(shuffledMovies);
      }

      if (searchQuery) {
        const queryFilter = query(
          collection(db, "movies"),
          where("title", ">=", searchQuery),
          where("title", "<=", searchQuery + "\uf8ff")
        );
        const filterQuerySnapshot = await getDocs(queryFilter);

        const filteredMovies = filterQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovieData(filteredMovies);
      }

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
                <MovieCard
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
