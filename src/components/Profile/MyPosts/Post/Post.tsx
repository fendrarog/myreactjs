import React from "react";
import s from "./Post.module.css";

type PropsType = {
  message: string;
  likesCount: number;
};

const Post: React.FC<PropsType> = ({ message, likesCount }) => {
  return (
    <div className={s.item}>
      <img
        src="https://cs11.pikabu.ru/post_img/big/2020/04/12/9/1586704514168132921.png"
        alt=""
      />
      {message}
      <div>
        <span>like</span> {likesCount}
      </div>
    </div>
  );
};

export default Post;
