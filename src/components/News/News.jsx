import s from "./News.module.css";
import React, { useState } from "react";

const News = () => {
  const [count, setCount] = useState(1);
  const [direction, setDirection] = useState("asc");
  /*   let counter = () => {
    if (direction === "asc") {
      count >= 9 && setDirection("desc");
      setCount(count + 1);
    } else if (direction === "desc") {
      count <= 2 && setDirection("asc");
      setCount(count - 1);
    }
  }; */

  const changeCountBy = {
    asc: (count) => {
      setCount(count + 1);
      if (count + 1 >= 10) {
        setDirection("desc");
      }
    },
    desc: (count) => {
      setCount(count - 1);
      if (count - 1 <= 1) {
        setDirection("asc");
      }
    },
  };
  const handleClick = () => {
    changeCountBy[direction](count);
  };

  //reduce training ----------------------------------------------------

  let arrNum = [1, 2, 2, 1];
  let arrNumReduce = arrNum.reduce((acc, current) => {
    return acc + current;
  }, 0);
  console.log(arrNumReduce);

  const isPalindrome = (somePalindrome) => {
    somePalindrome = somePalindrome.toLowerCase();
    return somePalindrome === [...somePalindrome].reverse().join("");
  };
  console.log(isPalindrome("lolalolka"));

  let parenthesesString = "(()))";
  const isParentheses = (someParenthesesString) => {
    debugger;
    const result = [...someParenthesesString].reduce((acc, cur) => {
      debugger;
      if (cur === "(") {
        acc.push(cur);
      } else if (cur === ")") {
        debugger;
        const lastElem = acc.pop();
        if (!lastElem) {
          debugger;
          acc = false;
        }
      }
      return acc;
    }, []);
    if (result.length !== 0) {
      debugger;
      return false;
    } else {
      return true;
    }
  };
  console.log(isParentheses(parenthesesString));

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
