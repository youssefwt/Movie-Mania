import "./Sidebar.css";
import {
  Chat,
  Group,
  PlayCircleFilledOutlined,
  RssFeed,
} from "@mui/icons-material";
import { Add, Remove } from "@mui/icons-material";

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../authContext/AuthContext";

import { Users } from "../../dummyData";

import CloseFriend from "../closeFriend/CloseFriend";
import axios from "axios";
export default function Sidebar({ user }) {
  const [followers, setfollowers] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  console.log(user);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );
  useEffect(() => {
    //get friends
    const getFriends = async () => {
      try {
        const followersList = await axios.get("http://localhost:8800/users", {
          headers: { token: `Bearer ${user.accessToken}` },
        });
        setfollowers(followersList.data);
        console.log(followersList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(
          `http://localhost:8800/users/${user._id}/unfollow`,
          {
            userId: currentUser._id,
          },
          //
          {
            headers: { token: `Bearer ${user.accessToken}` },
          }
        );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(
          `http://localhost:8800/users/${user._id}/follow`,
          {
            userId: currentUser._id,
          },
          //
          {
            headers: { token: `Bearer ${user.accessToken}` },
          }
        );
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper ">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
        </ul>
        <button className="sidebarButton"> Show More</button>
        <hr className="sidebarHr" />
        <div className="sidebarLiftContainer">
          <ul className="sidebarFriendLList">
            {followers.map((u) => (
              <div key={u._id}>
                <CloseFriend user={u} />
                <div className="sidebarFollow">
                  <button className="sidebarFollowButton" onClick={handleClick}>
                    {followed ? "Unfollow" : "Follow"}
                    {followed ? <Remove /> : <Add />}
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
