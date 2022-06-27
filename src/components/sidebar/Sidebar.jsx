import "./Sidebar.css";
import {
  Chat,
  Group,
  PlayCircleFilledOutlined,
  RssFeed,
} from "@mui/icons-material";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper ">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
        </ul>
        <button className="sidebarButton"> Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendLList">
          <li className="sidebarFriend">
            <img
              src="/assets/person/8.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">Esraa</span>
          </li>

          <li className="sidebarFriend">
            <img
              src="/assets/person/8.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">Esraa</span>
          </li>

          <li className="sidebarFriend">
            <img
              src="/assets/person/8.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">Esraa</span>
          </li>

          <li className="sidebarFriend">
            <img
              src="/assets/person/8.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">Esraa</span>
          </li>

          <li className="sidebarFriend">
            <img
              src="/assets/person/8.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">Esraa</span>
          </li>

          <li className="sidebarFriend">
            <img
              src="/assets/person/8.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">Esraa</span>
          </li>

          <li className="sidebarFriend">
            <img
              src="/assets/person/8.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">Esraa</span>
          </li>

          <li className="sidebarFriend">
            <img
              src="/assets/person/8.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">Esraa</span>
          </li>

          <li className="sidebarFriend">
            <img
              src="/assets/person/8.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">Esraa</span>
          </li>

          <li className="sidebarFriend">
            <img
              src="/assets/person/8.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">Esraa</span>
          </li>

          <li className="sidebarFriend">
            <img
              src="/assets/person/8.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">Esraa</span>
          </li>

          <li className="sidebarFriend">
            <img
              src="/assets/person/8.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">Esraa</span>
          </li>

          <li className="sidebarFriend">
            <img
              src="/assets/person/8.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">Esraa</span>
          </li>

          <li className="sidebarFriend">
            <img
              src="/assets/person/8.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">Esraa</span>
          </li>

          <li className="sidebarFriend">
            <img
              src="/assets/person/8.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">Esraa</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
