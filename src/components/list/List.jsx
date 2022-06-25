import "./list.scss";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Listitem from "../listitem/Listitem";
import { useRef, useState } from "react";

const List = () => {
  const [slideNum, setSlideNum] = useState(0);
  const [isMoved, setIsMoved] = useState(false);

  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    if (direction === "left" && slideNum > 0) {
      setSlideNum((prevNum) => prevNum - 1);
      listRef.current.style.transform = `translateX(${
        -slideNum * 230 + 230
      }px)`;
    }
    if (direction === "right" && slideNum < 4) {
      setSlideNum((prevNum) => prevNum + 1);
      listRef.current.style.transform = `translateX(${
        -230 - slideNum * 230
      }px)`;
    }
  };

  return (
    <div className="list">
      <span className="listTitle">Continue to watch</span>
      <div className="wrapper">
        <ArrowBackIosOutlinedIcon
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>
          <Listitem />
          <Listitem />
          <Listitem />
          <Listitem />
          <Listitem />
          <Listitem />
          <Listitem />
          <Listitem />
          <Listitem />
          <Listitem />
        </div>
        <ArrowForwardIosOutlinedIcon
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default List;
