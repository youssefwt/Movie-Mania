import "./featured.scss";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect, useState } from "react";
import axios from "axios";

const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  console.log(content);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>

          <select
            name="genre"
            id=""
            defaultValue="Genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="adventure">Adventure</option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="romantic">Romantic</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fanatasy</option>
            <option value="documentry">Documentry</option>
            <option value="animation">Animation</option>
          </select>
        </div>
      )}
      <img
        className="bgimg"
        src="https://static.theprint.in/wp-content/uploads/2020/10/Untitled-design-2020-10-06T120412.061.jpg?compress=true&quality=80&w=800&dpr=1.3"
        alt=""
      />
      <div className="info">
        <img
          src="https://www.nicepng.com/png/full/159-1595398_top-gun-logo-5728d6b49606ee3ce95a9759-top-gun-logo-png.png"
          alt=""
        />
        <span className="desc">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam,
          consectetur alias voluptas eum reprehenderit accusantium unde
          doloremque aliquid modi possimus quod at voluptatem ea quisquam
          consequuntur cupiditate? Rem, a natus!
        </span>
        <div className="buttons">
          <button className="play">
            <PlayCircleOutlineIcon />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlinedIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
