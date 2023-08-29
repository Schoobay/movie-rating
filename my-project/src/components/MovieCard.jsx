import React from "react";
import { useState, useEffect } from "react";
import missing from "../assets/missing.png";

const MovieCard = ({ title, image, description, rating, movie }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (title) {
      const url = `http://www.omdbapi.com/?t=${title}&apikey=ad59922c`;

      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();

          setData(data);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [title]);

  const ratingData = {};
  for (const key in movie) {
    if (
      key !== "year" &&
      key !== "title" &&
      key !== "id" &&
      key !== "timestamp"
    ) {
      ratingData[key] = movie[key];
    }
  }

  let sum = 0;
  let count = 0;

  for (const userRating in ratingData) {
    const rating = ratingData[userRating];
    if (rating !== null) {
      sum += rating;
      count++;
    }
  }

  const averageRating = count > 0 ? sum / count : 0;

  const roundedRating = count > 0 ? Math.round(averageRating * 10) / 10 : 0;

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className='w-full h-full  rounded-lg shadow bg-gray-800 border-gray-700'>
          <div>
            <img
              className='rounded-t-lg object-cover w-full h-2/3 '
              src={data.Poster ? data.Poster : missing}
              alt=''
            />
          </div>
          <div className='p-5'>
            <div>
              <h5 className='mb-2 text-2xl font-bold tracking-tight text-white line-clamp-1'>
                {title}
              </h5>
            </div>
            <p className='mb-3 font-normal  text-gray-400 line-clamp-2'>
              {data ? data.Plot : ""}
            </p>
            <h3 className='font-extrabold '>Rating: {roundedRating}</h3>
            <h3 className='font-bold text-orange-500'>
              IMDB Rating: {data.imdbRating}
            </h3>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
