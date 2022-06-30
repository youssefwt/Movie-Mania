import "./listitem.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Listitem = ({ index, item }) => {
  const [isHoverd, setIsHovered] = useState(false);
  //TODO: try implementing useLayoutEffect to fix hovering bug
  const [movie, setMovie] = useState({});
  // console.log(movie);

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
    <Link to="/watch" state={movie}>
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
                <PlayArrowIcon className="movieIcon" />
                <AddIcon className="movieIcon" />
                <ThumbUpOutlinedIcon className="movieIcon" />
                <ThumbDownAltOutlinedIcon className="movieIcon" />
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
