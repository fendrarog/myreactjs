import s from "./Post.module.css";

const Post = () => {
  return (
    <div className={s.item}>
      <img
        src="https://cs11.pikabu.ru/post_img/big/2020/04/12/9/1586704514168132921.png"
        alt=""
      />
      post 1
      <div>
        <span>like</span>
      </div>
    </div>
  );
};

export default Post;
