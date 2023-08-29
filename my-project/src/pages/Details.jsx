import React from "react";
import { useState, useEffect } from "react";
import missing from "../assets/missing.png";
import Rating from "../components/Rating";

import { useParams } from "react-router-dom";

import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const Details = ({ userName }) => {
  const { id } = useParams();
  const [docData, setDocData] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRatingData, setUserRatingData] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      const docRef = doc(db, "movies", id);

      try {
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setDocData(docSnapshot.data());
        } else {
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchDocument();
  }, [id]);

  useEffect(() => {
    if (docData) {
      // Check if title is not null or undefined
      const url = `http://www.omdbapi.com/?t=${docData.title}&plot=full&apikey=ad59922c`;

      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();

          setData(data);
          setIsLoading(false);
          setUserRatingData(ratingData);
        } catch (error) {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [docData]);
  console.log(data);

  const ratingData = {};
  for (const key in docData) {
    if (key !== "year" && key !== "title" && key !== "timestamp") {
      ratingData[key] = docData[key];
    }
  }

  let sum = 0;
  let count = 0;

  for (const user in ratingData) {
    if (ratingData[user] !== null) {
      sum += ratingData[user];
      count++;
    }
  }

  const averageRating = count > 0 ? sum / count : 0;
  const roundedRating = count > 0 ? Math.round(averageRating * 2) / 2 : 0;

  return (
    <>
      {isLoading || docData === null ? (
        "Loading..."
      ) : (
        <div className=' flex flex-col md:flex-row container mx-auto p-8 items-center justify-between h-2/3'>
          <img
            src={data ? data.Poster : missing}
            alt=''
            className='rounded-lg object-cover max-w-sm md:max-w-lg '
          />
          <div className='md:inline-block md:h-full flex flex-col divide-y-2 items-start md:items-end py-12 md:pl-8'>
            <h2>
              Release Year:{" "}
              <span className='font-bold text-cyan-400'>{data.Year}</span>
            </h2>
            <div>
              Runtime:{" "}
              <span className='font-bold text-cyan-400'>{data.Runtime}</span>
            </div>
            <div>
              Box Office:{" "}
              <span className='font-bold text-cyan-400'>{data.BoxOffice}</span>
            </div>

            <span className='text-left  md:h-auto line-clamp-4 text-cyan-400 pb-6 pt-2 p2-2'>
              {data.Plot}
            </span>
            <div>
              Director:{" "}
              <span className='font-bold text-cyan-400'>{data.Director}</span>
            </div>
            <div>
              Actors:{" "}
              <span className='font-bold text-cyan-400'>{data.Actors}</span>
            </div>

            <div className='text-cyan-400 font-bold '>
              <span>Our Rating: </span>
              {roundedRating}{" "}
              <div className='text-yellow-500'>IMDB: {data.imdbRating} </div>
            </div>
            <Rating
              userRatingData={userRatingData}
              userName={userName}
              id={id}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
