import "./Post.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Post({ post, deleteHandler }) {
  const MySwal = withReactContent(Swal);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUsers = async () => {
      // get user by id
      const res = await axios.get(
        `http://localhost:8800/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUsers();
  }, [post.userId, user.accessToken]);

  const likeHandler = async () => {
    try {
      //like / dislike a post
      await axios.put(
        "http://localhost:8800/posts/" + post._id + "/like",
        {
          userId: currentUser._id,
        },
        {
          headers: { token: `Bearer ${currentUser.accessToken}` },
        }
      );
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.userName}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.userName}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          {currentUser._id === post.userId && (
            <div className="postTopRight">
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  deleteHandler(post._id, currentUser.accessToken);
                }}
              >
                <ClearIcon />
              </Button>
            </div>
          )}
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {post.img ? (
            <img src={PF + post.img} alt="" className="postImg" />
          ) : null}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={isLiked ? `${PF}like.png` : `${PF}unlike.png`}
              alt=""
              onClick={likeHandler}
            />

            <span className="postLikeCounter">{like} people like it</span>
          </div>
          {/* <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
