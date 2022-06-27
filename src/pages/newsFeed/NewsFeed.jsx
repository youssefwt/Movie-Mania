import React from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./NewsFeed.css";

export default function NewsFeed() {
  return (
    <>
      <Topbar />
      <div className="NewsFeedContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
