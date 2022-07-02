import "./Topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";

import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { useContext } from "react";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Movie</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <div className="searchIcon">
            <Search />
          </div>

          <input
            placeholder="Search for post,frinde or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="tobparLinks">
          <span className="topbarLink">HomePage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>

          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>

          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.userName}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
