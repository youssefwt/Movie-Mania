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
import { Link } from "react-router-dom";
import CloseFriend from "../closeFriend/CloseFriend";
import axios from "axios";

export default function Sidebar({ user }) {
  const [followers, setfollowers] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(true);
  useEffect(() => {
    //get friends
    const getFriends = async () => {
      try {
        console.log(currentUser._id);
        const followersList = await axios.get(
          `http://localhost:8800/users/friends/${currentUser._id}`,
          {
            headers: { token: `Bearer ${currentUser.accessToken}` },
          }
        );
        setfollowers(followersList.data);
        // console.log(followersList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUser]);

  const handleClick = async (user) => {
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
            <Link
              to={`/messenger`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <span className="sidebarListItemText">Chats</span>
            </Link>
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
                <div class="row">
                  <div className="sidebarFollowContainer">
                    <div class=" col-4  col-sm-8 ">
                      <CloseFriend user={u} />
                    </div>
                    <div class="  col-8  col-sm-8 ">
                      <div className="sidebarFollow">
                        <button
                          className="sidebarFollowButton"
                          onClick={() => {
                            handleClick(u);
                          }}
                        >
                          {followed ? "Unfollow" : "Follow"}
                          {followed ? <Remove /> : <Add />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
