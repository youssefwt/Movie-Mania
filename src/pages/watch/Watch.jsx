import "./watch.scss";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useLocation } from "react-router-dom";

const Watch = () => {
  const location = useLocation();

  const movie = location.state;

  return (
    <div className="watch">
      <div className="back">
        <ArrowBackOutlinedIcon />
        Home
      </div>
      <video className="video" autoPlay progress controls src={movie.video} />
    </div>
  );
};

export default Watch;
