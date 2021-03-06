import "./list.scss";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Listitem from "../listitem/Listitem";
import { useRef, useState } from "react";

const List = ({ list, isSearching }) => {
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
      <div>
        {!isSearching ? (
          <span className="listTitle">{list.title}</span>
        ) : (
          <span className="listTitle">Searching For...</span>
        )}
        <div className="wrapper">
          <ArrowBackIosOutlinedIcon
            className="sliderArrow left"
            onClick={() => handleClick("left")}
            style={{ display: !isMoved && "none" }}
          />
          <div className="container" ref={listRef}>
            {list.content &&
              list.content.map((item, i) => (
                <Listitem key={i} index={i} item={item} />
              ))}
          </div>
          <ArrowForwardIosOutlinedIcon
            className="sliderArrow right"
            onClick={() => handleClick("right")}
          />
        </div>
      </div>
    </div>
  );
};

export default List;
