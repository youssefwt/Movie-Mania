import "./app.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NewsFeed from "./pages/newsFeed/NewsFeed";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import { AuthContext } from "./authContext/AuthContext";
import { useContext } from "react";
import Subscribe from "./components/subscribe/Subscribe";
import Messenger from "./pages/Messenger/Messenger";
import Search from "./pages/search/Search";
// import Profile from "./pages/profile/Profile";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/register" />} />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/subscribe" element={!user ? <Login /> : <Subscribe />} />
      {user ? (
        <>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/movies" element={<Home type="movie" />} />
          <Route path="/series" element={<Home type="series" />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/newsfeed" element={<NewsFeed />} />
          <Route path="/profile/:userName" element={<Profile />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/search" element={<Search />} />
        </>
      ) : (
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
      )}
    </Routes>
  );
};

export default App;
