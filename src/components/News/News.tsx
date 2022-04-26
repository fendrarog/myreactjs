import React, { useState } from "react";
import s from "./News.module.css";

const News: React.FC = () => {
  const [count, setCount] = useState(1);
  const [direction, setDirection] = useState("asc");

  const changeCountBy = {
    asc: (count: any) => {
      setCount(count + 1);
      if (count + 1 >= 10) {
        setDirection("desc");
      }
    },
    desc: (count: any) => {
      setCount(count - 1);
      if (count - 1 <= 1) {
        setDirection("asc");
      }
    },
  };
  const handleClick = () => {
    // @ts-ignore
    changeCountBy[direction](count);
  };

  return (
    <>
      {/* <button className={s.counter} onClick={counter}>
        {count}
      </button> */}
      <button className={s.counter} onClick={handleClick}>
        {count}
      </button>
    </>
  );
};

export default News;
