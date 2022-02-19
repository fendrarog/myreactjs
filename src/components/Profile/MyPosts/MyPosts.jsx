import React from "react";
import { useForm } from "react-hook-form";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
//import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/profile-reducer";

const MyPosts = (props) => {
  let postsElements = props.postsData.map((p) => (
    <Post message={p.message} likesCount={p.likesCount} />
  ));

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>

      <AddPostForm addPost={props.addPost}/>

      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

const AddPostForm = (props) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({mode:"onChange"});

  const onSubmit = (data) => {
    props.addPost(data.postField);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("postField", {
          required: "Пустое поле.",
          maxLength: 10,
        })}
        placeholder="Введите текст"
        autocomplete="off"
      />
      <div>{errors?.postField && <p>{errors?.postField.message || "Слишком много символов."}</p>}</div>
      <input type="submit" disabled={!isValid}/>
    </form>
  );
};

export default MyPosts;
