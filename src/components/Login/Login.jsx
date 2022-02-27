import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../redux/auth-reducer";

export const Login = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    dispatch(login(data.login, data.password, data.rememberMe));
    reset();
  };

  if (isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <div>
      <h1>Login your account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Login site:
          <input
            {...register("login", {
              required: "Поле обязательно к заполнению.",
              minLength: {
                value: 5,
                message: "Минимум 5 символов.",
              },
            })}
          />
        </label>
        <div>{errors?.login && <p>{errors.login?.message || "Error!"}</p>}</div>
        <label>
          Password :
          <input
            {...register("password", {
              required: "Поле обязательно к заполнению.",
              minLength: {
                value: 5,
                message: "Минимум 5 символов.",
              },
            })}
            //            type="password"
          />
        </label>
        <div>
          {errors?.password && <p>{errors.password?.message || "Error!"}</p>}
        </div>
        <label>
          Remember me
          <input {...register("rememberMe")} type="checkbox" />
        </label>
        <div>
          <input type="submit" disabled={!isValid} />
        </div>
      </form>
    </div>
  );
};
