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
        <Card className='mt-6 w-96'>
          <CardHeader color='blue-gray' className='relative h-56'>
            <img
              src='https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
              alt='card-image'
            />
          </CardHeader>
          <CardBody>
            <Typography variant='h5' color='blue-gray' className='mb-2'>
              UI/UX Review Check
            </Typography>
            <Typography>
              The place is close to Barceloneta Beach and bus stop just 2 min by
              walk and near to &quot;Naviglio&quot; where you can enjoy the main
              night life in Barcelona.
            </Typography>
          </CardBody>
          <CardFooter className='pt-0'>
            <Button>Read More</Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default MovieCard;
