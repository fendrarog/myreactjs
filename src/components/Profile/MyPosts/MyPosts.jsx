import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { actions } from "../../../redux/profile-reducer";

const MyPosts = () => {
  const postsData = useSelector((state) => state.profilePage.postsData);

  let postsElements = postsData.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  ));

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>

      <AddPostForm />

      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

const AddPostForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    dispatch(actions.addPost(data.postField));
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
        autoComplete="off"
      />
      <div>
        {errors?.postField && (
          <p>{errors?.postField?.message || "Слишком много символов."}</p>
        )}
      </div>
      <input type="submit" disabled={!isValid} />
    </form>
  );
};

export default MyPosts;
