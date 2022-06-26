import "./listitem.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import { useState } from "react";

const Listitem = ({ index }) => {
  const [isHoverd, setIsHovered] = useState(false);
  //TODO: try implementing useLayoutEffect to fix hovering bug

  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";

  return (
    <div
      className="listitem"
      style={{ left: isHoverd && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src="https://i.redd.it/5fcbz8rj4dh11.jpg" alt="" />
      {isHoverd && (
        <>
          <video src={trailer} autoPlay={true} loop />

          <div className="itemInfo">
            <div className="icons">
              <PlayArrowIcon className="icon" />
              <AddIcon className="icon" />
              <ThumbUpOutlinedIcon className="icon" />
              <ThumbDownAltOutlinedIcon className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>1 hour 15 mins</span>
              <span className="limit">+16</span>
              <span>2004</span>
            </div>
            <div className="desc">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
              fuga quod enim,ipsum dolor sit amet consectetur.
            </div>
            <div className="genre">Animation</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Listitem;
