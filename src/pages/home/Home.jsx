import { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState(null);
  const [genre, setGenre] = useState(null);
  const [isSearching, setIsSearching] = useState(null);
  const [searchingList, setSearchingList] = useState(null);

  console.log(isSearching);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            type && genre ? "&genre=" + genre.toLowerCase() : ""
          }`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
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

  useEffect(() => {
    if (isSearching) {
      const getSearchingList = async () => {
        try {
          const res = await axios.post(
            "/movies/search",
            {
              search: isSearching,
            },
            {
              headers: {
                token:
                  "Bearer " +
                  JSON.parse(localStorage.getItem("user")).accessToken,
              },
            }
          );

          setSearchingList({
            title: "Searching For ...",
            content: res.data.map((item) => item._id).slice(0, 10),
          });
          console.log(res.data.map((item) => item._id));
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getSearchingList();
    }
  }, [isSearching, genre, type]);

  return (
    <div className="home">
      <Navbar setIsSearching={setIsSearching} />
      <Featured type={type} setGenre={setGenre} />
      {isSearching && searchingList && (
        <List isSearching={isSearching} list={searchingList} />
      )}
      {lists && lists.map((list) => <List key={list._id} list={list} />)}
    </div>
  );
};

export default Home;
