import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./Feed.css";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

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
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
