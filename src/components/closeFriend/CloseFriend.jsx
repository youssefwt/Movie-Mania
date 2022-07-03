import "./CloseFriend.css";
import { Link } from "react-router-dom";
export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <li className="sidebarFriend">
        <Link to={`/profile/${user.userName}`}>
          <img src={user.profilePicture} alt="" className="sidebarFriendImg" />
        </Link>
        <span className="sidebarFriendName">{user.userName}</span>
      </li>
    </div>
  );
}
