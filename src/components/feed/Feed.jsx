import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./Feed.css";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Feed({ username }) {
  const MySwal = withReactContent(Swal);
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const deleteHandler = async (id, accessToken) => {
    MySwal.fire({
      title: "Are you sure you want to delete the post?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#007006",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire("Deleted!", "Your post has been deleted.", "success");
        try {
          axios
            .delete(`http://localhost:8800/posts/${id}`, {
              headers: { token: `Bearer ${accessToken}` },
            })
            .then(() => {
              setPosts(posts.filter((post) => post._id !== id));
            });
        } catch (err) {}
      }
    });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("http://localhost:8800/posts/profile/" + username, {
            headers: { token: `Bearer ${user.accessToken}` },
          })
        : await axios.get("http://localhost:8800/posts/timeline/" + user._id, {
            headers: { token: `Bearer ${user.accessToken}` },
          });
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.userName) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} deleteHandler={deleteHandler} />
        ))}
      </div>
    </div>
  );
}
