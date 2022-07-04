import { useContext } from "react";
import SearchUser from "../../components/searchUser/SearchUser";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./Search.css";
import { AuthContext } from "../../authContext/AuthContext";

export default function Search() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <Topbar />
          </div>
          <div className="SearchContainer">
            <div class="col-2">
              <Sidebar user={user} />
            </div>
            <div class="col-9">
              <SearchUser />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
