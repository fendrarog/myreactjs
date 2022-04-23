import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../redux/auth-reducer";
import { CombinedStateType } from "../../redux/redux-store";

const Login: React.FC<{}> = () => {
  const { captchaUrl, isAuth, userEmail, rememberMe } = useSelector(
    (state: CombinedStateType) => state.auth
  );
  const dispatch = useDispatch();

  //const [checked, toggle] = useReducer((checked) => !checked, rememberMe);
  const [checked, setChecked] = useState(rememberMe);

  type LoginData = {
    login: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
  };
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginData>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    dispatch(login(data.login, data.password, data.rememberMe, data.captcha));
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
            defaultValue={userEmail ? userEmail : null}
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
          {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
        </div>
        <label>
          Remember me
          <input
            type="checkbox"
            {...register("rememberMe", {
              onChange: () => {
                setChecked(!checked);
              },
            })}
            checked={checked}
          />
        </label>
        {captchaUrl && (
          <div>
            <div>
              <img src={captchaUrl} alt="#" />
            </div>
            <div>
              <input type="text" {...register("captcha", { required: true })} />
            </div>
          </div>
        )}
        <div>
          <input type="submit" disabled={!isValid} />
        </div>
      </form>
    </div>
  );
};

export default Login;
