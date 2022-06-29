import { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmFmM2U5MzMyNDgyNjQ2NWEwYTljZCIsImVtYWlsIjoiam9lQGpvZS5jb20iLCJ1c2VyTmFtZSI6InlvdXNzZWYiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU2NDE5MzA1LCJleHAiOjE2NTY2Nzg1MDV9.0tZdfnDKySyALlUjwiywB_u--oka4Bldgmt4xf2C6rM",
            },
          }
        );
        setLists(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [genre, type]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      <List />
      <List />
      <List />
    </div>
  );
};

export default Home;
