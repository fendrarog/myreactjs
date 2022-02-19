import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../redux/auth-reducer";

const Login = (props) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    props.login(data.login, data.password, data.rememberMe);
    reset();
  };

  if (props.isAuth) {
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

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
