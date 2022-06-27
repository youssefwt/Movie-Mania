import "./app.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NewsFeed from "./pages/newsFeed/NewsFeed";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";

const App = () => {
  const user = true;
  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/register" />} />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />
      {user && (
        <>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/movies" element={<Home type="movies" />} />
          <Route path="/series" element={<Home type="series" />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/newsfeed" element={<NewsFeed />} />
        </>
      )}
    </Routes>
  );
};

export default App;
