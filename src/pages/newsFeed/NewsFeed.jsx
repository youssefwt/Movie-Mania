import React from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./NewsFeed.css";

import { useState, useEffect } from "react";

import axios from "axios";

import { useParams } from "react-router";

export default function NewsFeed() {
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username, user.accessToken]);
  return (
    <>
      <Topbar />
      <div className="NewsFeedContainer">
        <Sidebar user={user} />
        <Feed />
      </div>
    </>
  );
}
