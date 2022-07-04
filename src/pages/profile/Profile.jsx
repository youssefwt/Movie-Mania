import "./Profile.css";
import { PermMedia, Cancel } from "@mui/icons-material";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().userName;
  const [file, setFile] = useState(null);
  const { user: currentUser } = useContext(AuthContext);
  console.log(user);
  console.log(currentUser);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);

      try {
        console.log(user);
        await axios.post("http://localhost:8800/api/upload", data, {
          headers: { token: `Bearer ${currentUser.accessToken}` },
        });
        console.log(user);
        await axios.patch(
          `http://localhost:8800/users/${user._id}`,
          {
            profilePicture: fileName,
          },
          {
            headers: { token: `Bearer ${currentUser.accessToken}` },
          }
        );
      } catch (err) {}
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/users?username=${username}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [username, user.accessToken]);
  return (
    <>
      <Topbar />
      <div class="row ">
        <div className="profile">
          <div class="col-lg-2 col-md-4 col-sm-5 col-5">
            <Sidebar />
          </div>
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                <img
                  className="profileCoverImg"
                  src={
                    user.coverPicture
                      ? PF + user.coverPicture
                      : PF + "person/noCover.png"
                  }
                  alt=""
                />
                {currentUser._id === user._id ? (
                  <div class="profileChangePictureContainer">
                    {file && (
                      <div className="couldBeProfileImgContainer">
                        <img
                          className="CouldBeProfileImg"
                          src={URL.createObjectURL(file)}
                          alt=""
                        />
                        <Cancel
                          className="CouldbeCancelImg"
                          onClick={() => setFile(null)}
                        />
                      </div>
                    )}
                    <form
                      className="CouldBeProfileForm"
                      onSubmit={submitHandler}
                    >
                      <div className="CouldBeProfileOptions">
                        <label htmlFor="file" className="shareOption">
                          <img
                            className="profileUserImg"
                            src={
                              user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "person/noAvatar.png"
                            }
                            alt=""
                          />
                          <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            accept=".png,.jpeg,.jpg"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                        </label>
                      </div>
                      {file && (
                        <div className="DivOfButton">
                          <button className="CouldBeSubmitButton">
                            Change Picture
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                ) : (
                  <img
                    className="profileUserImg"
                    src={
                      user.profilePicture
                        ? PF + user.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                  />
                )}
              </div>
              <div className="profileInfo">
                <h4 className="profileInfoName">{user.userName}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
              </div>
            </div>

            <div className="profileRightBottom">
              <div class=" col-8  ">
                <Feed username={username} />
              </div>
              <div class="col-2 ">
                <Rightbar user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
