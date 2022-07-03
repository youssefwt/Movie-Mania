import React from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./NewsFeed.css";
import { AuthContext } from "../../authContext/AuthContext";
import { useContext, useEffect } from "react";

export default function NewsFeed() {
  const { user } = useContext(AuthContext);
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
