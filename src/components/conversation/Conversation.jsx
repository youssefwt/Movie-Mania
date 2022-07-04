import axios from "axios";
import "./Conversation.css";
import { useEffect, useState } from "react";

export default function Conversation({ conversation, currentUser, search }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
    if (search) {
      setIsVisible(
        user.userName
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
          user.email.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    } else {
      setIsVisible(true);
    }
  }, [currentUser, conversation]);

  return (
    isVisible && (
      <div className="conversation">
        <img
          className="conversationImg"
          src={
            user?.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
        />
        <span className="conversationName">{user?.userName}</span>
      </div>
    )
  );
}
