import "./Topbar.css";
import { Search } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { useContext, useRef, useState } from "react";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const search = useRef();
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.current.value.length > 0) {
      navigate(`/search?q=${search.current.value}`);
    }
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Movie</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <input
            placeholder="Search for friends"
            className="searchInput"
            ref={search}
          />
          <div className="searchIcon">
            <Search onClick={handleSearch} style={{ cursor: "pointer" }} />
          </div>
        </div>
      </div>
      <div className="topbarRight">
        <div className="tobparLinks"></div>
        <div className="topbarIcons">
          <Link to={`/`} style={{ textDecoration: "none", color: "white" }}>
            <span className="topbarLink">HomePage</span>
          </Link>
          <Link
            to={`/newsfeed`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <span className="topbarLink">Timeline</span>
          </Link>
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
