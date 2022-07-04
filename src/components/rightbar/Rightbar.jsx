import "./Rightbar.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
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
    } catch (err) {}
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
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings"></div>
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
