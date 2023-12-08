import React from "react";
import { useState, useEffect } from "react";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const users = [
  "reuben",
  "patryk",
  "callum",
  "david",
  "evan",
  "shane",
  "neil",
  "glen",
];

// const renderRatingOptions = () => {
//   const options = [];
//   for (let i = 0.5; i <= 10; i += 0.5) {
//     options.push(
//       <option key={i} value={i}>
//         {i}
//       </option>
//     );
//   }
//   return options;
// };

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

  const options = [
    0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5,
    8.0, 8.5, 9.0, 9.5, 10.0,
  ];

  return (
    <>
      <Card color='blue-gray-50' shadow={false} className='p-10'>
        <div className='m-auto'>
          <Typography variant='h4' color='blue-gray'>
            Add Movie
          </Typography>
          <Typography color='gray' className='mt-1 font-normal'>
            Please use the title from IMDB website
          </Typography>
          <form
            className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
            onSubmit={handleAddMovie}
          >
            <div className='mb-1 flex flex-col gap-6'>
              <Typography variant='h6' color='blue-gray' className='-mb-3'>
                Movie Title:
              </Typography>
              <Input
                id='title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Example: Air'
                size='lg'
                className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant='h6' color='blue-gray' className='-mb-3'>
                Your Rating:
              </Typography>
              <Select
                id='rating'
                size='lg'
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                label='Select Rating'
              >
                {options.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </div>

            <Button className='mt-6' fullWidth onClick={handleAddMovie}>
              Save
            </Button>
          </form>
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
      </Card>
    </>
  );
};

export default AddMovie;
