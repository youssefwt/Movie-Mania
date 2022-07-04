import "./listitem.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";

const Listitem = ({ index, item }) => {
  const [isHoverd, setIsHovered] = useState(false);
  //TODO: try implementing useLayoutEffect to fix hovering bug
  const [movie, setMovie] = useState({});
  const { user } = useContext(AuthContext);

  const handleLike = () => {
    try {
      const likeMovie = async () => {
        movie.likes.push(user._id);
        const res = await axios.post(
          `/movies/${movie._id}/like`,
          {},
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setMovie(res.data);
      };
      likeMovie();
    } catch (err) {}
  };

  const handleDislike = () => {
    try {
      const likeMovie = async () => {
        movie.likes.splice(movie.likes.indexOf(user._id), 1);
        const res = await axios.delete(`/movies/${movie._id}/like`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      };
      likeMovie();
    } catch (err) {}
  };

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/" + item, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link to="">
      <div
        className="movieListitem"
        style={{ left: isHoverd && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.image} alt="" />
        {isHoverd && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />

            <div className="movieInfo">
              <div className="movieIcons">
                <Link to="/watch" state={movie}>
                  <PlayArrowIcon className="movieIcon" />
                </Link>
                {movie &&
                movie.likes.includes(
                  JSON.parse(localStorage.getItem("user"))._id
                ) ? (
                  <ThumbUpIcon className="movieIcon" onClick={handleDislike} />
                ) : (
                  <ThumbUpOutlinedIcon
                    className="movieIcon"
                    onClick={handleLike}
                  />
                )}
              </div>
              <div className="movieInfoTop">
                <span>{movie.duration}</span>
                {/* <span className="movieLimit">{movie.limit}</span> */}
                <span className="movieLimit">+16</span>
                <span>{movie.year}</span>
              </div>
              <div className="movieDesc">{movie.desc}</div>
              <div className="movieGenre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default Listitem;
