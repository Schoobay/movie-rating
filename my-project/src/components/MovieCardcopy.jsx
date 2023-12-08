import React from "react";
import { useState, useEffect } from "react";
import missing from "../assets/missing.png";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

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
        <Card className='mt-6 md:w-96 max-w-sm md:h-[500px] h-[440px] relative flex'>
          <CardHeader color='blue-gray' className='relative md:h-64 max-h-96'>
            <img
              src={data.Poster ? data.Poster : missing}
              alt='card-image'
              className='object-center w-full'
            />
          </CardHeader>
          <CardBody className='flex flex-col justify-between'>
            <Typography variant='h5' color='blue-gray' className='mb-2'>
              {title}
            </Typography>
            <Typography className='overflow-hidden md:h-14 h-10 text-sm'>
              {data ? data.Plot : ""}
            </Typography>
          </CardBody>
          <CardFooter className='flex gap-3 w-36 absolute bottom-2'>
            <Button className='bg-amber-300 h-12 text-xs w-16 p-2 md:w-auto md:h-auto md:whitespace-nowrap'>
              Rating: {roundedRating}
            </Button>
            <Button className='h-12 text-xs w-16 p-2 md:w-20 md:h-auto md:whitespace-nowrap'>
              IMDB: {data.imdbRating}
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default MovieCard;
