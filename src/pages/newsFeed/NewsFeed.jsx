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

      <div class="row ">
        <div className="NewsFeedContainer">
          <div class="col-lg-3 col-md-4 col-5">
            <Sidebar user={user} />
          </div>
          <div class="col-lg-9 col-md-8 col-7">
            <Feed />
          </div>
        </div>
      </div>
    </>
  );
}
