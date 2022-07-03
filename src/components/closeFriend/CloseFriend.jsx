import "./CloseFriend.css";

export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div>
      <li className="sidebarFriend">
        <img src={user.profilePicture} alt="" className="sidebarFriendImg" />
        <span className="sidebarFriendName">{user.userName}</span>
      </li>
    </div>
  );
}
