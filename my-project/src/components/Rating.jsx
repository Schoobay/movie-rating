import React from "react";
import { useState } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Rating = ({ userRatingData, userName, id }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

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

  const navigate = useNavigate();
  const userRatingsArray = Object.entries(userRatingData);

  // Sort the array in descending order based on the rating
  userRatingsArray.sort((a, b) => b[1] - a[1]);

  let targetUser = userName;

  const handleUpdateRating = async (e) => {
    e.preventDefault();
    try {
      const userDocRef = doc(db, "movies", id);

      await updateDoc(userDocRef, {
        [userName]: parseFloat(selectedRating),
        timestamp: serverTimestamp(),
      });
      window.location.reload();
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  return (
    <>
      <h2>Set your rating below if you have not already</h2>
      <div>
        {userRatingsArray.length > 0 ? (
          userRatingsArray.map(([user, userRating], index) => (
            <div key={index} className='capitalize'>
              {user}:{" "}
              <span className='text-cyan-400 font-bold'>
                {user === targetUser ? (
                  <form className='inline-block'>
                    <select
                      value={selectedRating}
                      onChange={handleRatingChange}
                      className='bg-slate-200 rounded-lg text-black'
                      disabled={userRating !== null}
                    >
                      {userRating !== null ? (
                        <option value={userRating}>Rating: {userRating}</option>
                      ) : (
                        renderRatingOptions()
                      )}
                    </select>
                    {userRating == null ? (
                      <button
                        onClick={handleUpdateRating}
                        className='bg-orange-500 rounded-full py-1 px-2'
                      >
                        Save
                      </button>
                    ) : (
                      ""
                    )}
                  </form>
                ) : userRating !== null ? (
                  userRating
                ) : (
                  "No Rating"
                )}
              </span>
            </div>
          ))
        ) : (
          <p>No data</p>
        )}
        <h3 className='italic'>
          NOTE: Once you change the rating here it will be set
        </h3>
      </div>
    </>
  );
};

export default Rating;
