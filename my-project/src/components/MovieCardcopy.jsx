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
        <Card
          shadow={false}
          className='relative grid md:h-[40rem] h-96 w-full max-w-[28rem] items-end justify-center overflow-hidden text-center'
        >
          <CardHeader
            floated={false}
            shadow={false}
            color='transparent'
            style={{
              backgroundImage: `url('${data?.Poster ? data.Poster : missing}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className={"absolute inset-0 m-0 h-full w-full rounded-none"}
          >
            <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50' />
          </CardHeader>
          <CardBody className='relative py-14 px-6 md:px-12'>
            <Typography
              variant='h2'
              color='white'
              className='mb-6 text-xl font-bold leading-[1] max-h-20 w-40 overflow-hidden p-2'
            >
              {title}
            </Typography>
            <div className='w-36 flex md:h-auto flex-col gap-1 mx-auto'>
              <Button className='bg-amber-300 h-12 text-xs w-full p-2 md:w-auto md:h-auto md:whitespace-nowrap'>
                Rating: {roundedRating}
              </Button>
              <Button className='h-12 text-xs w-full p-2  md:h-auto md:whitespace-nowrap'>
                IMDB: {data.imdbRating}
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default MovieCard;
