import React from "react";
import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./NewsFeed.css";
import { AuthContext } from "../../authContext/AuthContext";
import { useContext } from "react";

export default function NewsFeed() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <Topbar />
          </div>
          <div className="NewsFeedContainer">
            <div class="col-2">
              <Sidebar user={user} />
            </div>
            <div class="col-9">
              <Feed />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
