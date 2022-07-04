import "./Rightbar.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { Add, Remove } from "@mui/icons-material";
import FavouriteMovie from "../favouriteMovie/FavouriteMovie";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [likes, setLikes] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
    setLikes(user?.likes);
  }, [currentUser, user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(
          `http://localhost:8800/users/${user._id}/unfollow`,
          {},
          {
            headers: { token: `Bearer ${currentUser.accessToken}` },
          }
        );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(
          `http://localhost:8800/users/${user._id}/follow`,
          {},
          {
            headers: { token: `Bearer ${currentUser.accessToken}` },
          }
        );
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const handleMessage = async () => {
    try {
      await axios.post(`/conversations`, {
        senderId: currentUser._id,
        receiverId: user._id,
      });

      navigate("/messenger", { state: { user } });
    } catch (err) {
      console.log(err);
    }
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.userName !== currentUser.userName && (
          <>
            <button className="rightbarFollowButton" onClick={handleClick}>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <Remove /> : <Add />}
            </button>
            <button className="rightbarMessageButton" onClick={handleMessage}>
              Message
            </button>
          </>
        )}
        <h4 className="rightbarTitle">Favourite Movies</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            {user && user.likes && user.likes.length > 0 ? (
              user.likes.map((movieId) => (
                <FavouriteMovie key={movieId} movieId={movieId} />
              ))
            ) : (
              <p>No favourite movies</p>
            )}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <ProfileRightbar />
      </div>
    </div>
  );
}
