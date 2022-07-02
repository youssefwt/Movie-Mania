import "./watch.scss";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { useContext } from "react";

const Watch = () => {
  const location = useLocation();
  const movie = location.state;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const subscribedTillStr = user.subscribedTill.slice(0, 10);
    const subscribedTill = new Date(subscribedTillStr);
    const daysLeft = (subscribedTill - new Date()) / (1000 * 60 * 60 * 24);
    if (daysLeft <= 0) {
      navigate("/subscribe");
    }
  }, [user, navigate]);

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
