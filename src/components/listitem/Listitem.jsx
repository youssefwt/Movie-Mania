import "./listitem.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";

const Listitem = () => {
  return (
    <div className="listitem">
      <img src="https://i.redd.it/5fcbz8rj4dh11.jpg" alt="" />
      <div className="container">
        <div className="icons">
          <PlayArrowIcon />
          <AddIcon />
          <ThumbUpOutlinedIcon />
          <ThumbDownAltOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Listitem;
