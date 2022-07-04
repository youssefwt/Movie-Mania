import "./SearchUser.css";
import { AuthContext } from "../../authContext/AuthContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

export default function SearchUser() {
  const { user } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      if (searchParams.get("q")) {
        const res = await axios.post(
          "http://localhost:8800/users/search",
          {
            userName: searchParams.get("q"),
          },
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
          }
        );
        setUsers(res.data);
      }
    };
    getUsers();
    console.log(users);
  }, [searchParams]);

  return (
    <>
      <div className="searchContainer">
        {users.map((u) => (
          <div className="searchUser" key={u._id}>
            <Link to={`/profile/${u.userName}`}>
              <img src={u.profilePicture} alt="" className="searchUserImg" />
            </Link>
            <span className="searchUserName">{u.userName}</span>
          </div>
        ))}
      </div>
    </>
  );
}
