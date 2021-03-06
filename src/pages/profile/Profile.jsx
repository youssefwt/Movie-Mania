import "./Profile.css";
import { Cancel } from "@mui/icons-material";
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
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const profilePictureHandler = async (e) => {
    e.preventDefault();
    if (profilePicture && user._id === currentUser._id) {
      const data = new FormData();
      const profilePictureName = Date.now() + profilePicture.name;
      data.append("name", profilePictureName);
      data.append("file", profilePicture);
      try {
        await axios.post("http://localhost:8800/api/upload", data, {
          headers: { token: `Bearer ${currentUser.accessToken}` },
        });
        await axios.patch(
          `http://localhost:8800/users/${user._id}`,
          {
            profilePicture: profilePictureName,
            oldProfilePicture: currentUser.profilePicture,
          },
          {
            headers: { token: `Bearer ${currentUser.accessToken}` },
          }
        );
        dispatch({ type: "CHANGEPP", payload: profilePictureName });
        window.location.reload();
      } catch (err) {}
    }
  };
  const coverSubmitHandler = async (e) => {
    e.preventDefault();
    if (coverFile && user._id === currentUser._id) {
      const coverData = new FormData();
      const coverFileName = Date.now() + coverFile.name;
      coverData.append("name", coverFileName);
      coverData.append("file", coverFile);
      try {
        await axios.post("http://localhost:8800/api/upload", coverData, {
          headers: { token: `Bearer ${currentUser.accessToken}` },
        });
        console.log(user);
        await axios.patch(
          `http://localhost:8800/users/${user._id}`,
          {
            coverPicture: coverFileName,
            oldCoverPicture: currentUser.coverPicture,
          },
          {
            headers: { token: `Bearer ${currentUser.accessToken}` },
          }
        );
        dispatch({ type: "CHANGECP", payload: coverFileName });
        window.location.reload();
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
              <div className="AllContainer">
                {currentUser._id === user._id ? (
                  <div className="CoverChangePictureContainer">
                    {coverFile && (
                      <div className="couldBeCoverImgContainer">
                        <img
                          className="CouldBeCoverImg"
                          src={URL.createObjectURL(coverFile)}
                          alt=""
                        />
                        <Cancel
                          className="CouldbeCancelCoverImg"
                          onClick={() => setCoverFile(null)}
                        />
                      </div>
                    )}
                    <form
                      className="CouldBeCoverForm"
                      onSubmit={coverSubmitHandler}
                    >
                      <div className="CouldBeCoverOptions">
                        <label htmlFor="coverFile" className="shareOption">
                          <img
                            className="profileCoverImg"
                            src={
                              user.coverPicture
                                ? PF + user.coverPicture
                                : PF + "person/noCover.png"
                            }
                            alt=""
                          />
                          <input
                            style={{ display: "none" }}
                            type="file"
                            id="coverFile"
                            accept=".png,.jpeg,.jpg"
                            onChange={(e) => setCoverFile(e.target.files[0])}
                          />
                        </label>
                      </div>
                      {coverFile && (
                        <div className="DivOfButton">
                          <button className="CouldBeCoverSubmitButton">
                            Change Picture
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                ) : (
                  <img
                    className="profileCoverImg"
                    src={
                      user.coverPicture
                        ? PF + user.coverPicture
                        : PF + "person/noCover.png"
                    }
                    alt=""
                  />
                )}
                {/* profile Image */}
                {currentUser._id === user._id ? (
                  <div class="profileChangePictureContainer">
                    {profilePicture && (
                      <div className="couldBeProfileImgContainer">
                        <img
                          className="CouldBeProfileImg"
                          src={URL.createObjectURL(profilePicture)}
                          alt=""
                        />
                        <Cancel
                          className="CouldbeCancelImg"
                          onClick={() => setProfilePicture(null)}
                        />
                      </div>
                    )}
                    <form
                      className="CouldBeProfileForm"
                      onSubmit={profilePictureHandler}
                    >
                      <div className="CouldBeProfileOptions">
                        <label htmlFor="profilePicture" className="shareOption">
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
                            id="profilePicture"
                            accept=".png,.jpeg,.jpg"
                            onChange={(e) =>
                              setProfilePicture(e.target.files[0])
                            }
                          />
                        </label>
                      </div>
                      {profilePicture && (
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
