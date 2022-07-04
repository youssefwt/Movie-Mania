import "./watch.scss";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Watch = () => {
  const location = useLocation();
  const movie = location.state;
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);

  // const isSubscribed = async () => {
  //   try {
  //     const res = await axios.get("/payment/isSubscribed", {
  //       headers: {
  //         token:
  //           "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
  //       },
  //     });
  //     console.log(res.data.isSubscribed);
  //     if (!res.data.isSubscribed) {
  //       navigate("/subscribe", { state: movie });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // isSubscribed();

  useEffect(() => {
    const isSubscribed = async () => {
      try {
        const res = await axios.get("/payment/isSubscribed", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        console.log(res.data.isSubscribed);
        if (!res.data.isSubscribed) {
          navigate("/subscribe", { state: movie });
        } else {
          setIsSubscribed(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    isSubscribed();
  });

  return isSubscribed ? (
    <>
      <div className="watch">
        <div className="back">
          <ArrowBackOutlinedIcon />
          <Link to="/">Home</Link>
        </div>
        <video className="video" autoPlay progress controls src={movie.video} />
      </div>
    </>
  ) : (
    <div id="circular3dG">
      <div id="circular3d_1G" class="circular3dG"></div>
      <div id="circular3d_2G" class="circular3dG"></div>
      <div id="circular3d_3G" class="circular3dG"></div>
      <div id="circular3d_4G" class="circular3dG"></div>
      <div id="circular3d_5G" class="circular3dG"></div>
      <div id="circular3d_6G" class="circular3dG"></div>
      <div id="circular3d_7G" class="circular3dG"></div>
      <div id="circular3d_8G" class="circular3dG"></div>
    </div>
  );
};

export default Watch;
