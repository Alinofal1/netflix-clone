import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const Movie = ({ x, id }) => {
  let [like, setLike] = useState(false);
  let [saved, setsaved] = useState(false);
  const { user } = UserAuth();

  const movieId = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setsaved(true);
      await updateDoc(movieId, {
        saveShows: arrayUnion({
          id: x.id,
          title: x.title,
          img: x.backdrop_path,
        }),
      });
    } else {
      alert("please log in to save a movie");
    }
  };

  return (
    <div
      key={id}
      className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
    >
      <img
        className="text-white w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${x?.backdrop_path}`}
        alt={x?.title}
      />
      <div className="w-full h-full absolute top-0 left-0 hover:bg-black/80 opacity-0  hover:opacity-100 text-white">
        <p className="whitespace-nowrap text-sm font-bold flex justify-center items-center h-full text-center">
          {x?.title}
        </p>
        <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;
