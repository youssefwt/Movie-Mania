import { useState, useEffect, useContext } from "react";
import "./FavouriteMovie.css";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";

export default function FavouriteMovie({ movieId }) {
  const [movie, setMovie] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(`http://localhost:8800/movies/${movieId}`, {
        headers: { token: `Bearer ${currentUser.accessToken}` },
      });
      setMovie(res.data);
    };
    fetchMovie();
  }, [movieId]);
  return (
    <>
      <li className="rightbarFavouriteMovie">
        <img src={movie.image} alt="" className="rightbarFavouriteMovieImg" />

        <span className="rightbarFavouriteMovieName">{movie.title} </span>
      </li>
    </>
  );
}
