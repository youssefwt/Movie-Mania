import { useContext, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import "./login.scss";
import { login } from "../../authContext/apiCalls";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = ({ email, password }) => {
    login({ email, password }, dispatch);
  };

  console.log(errors);

  const navigate = useNavigate();

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://raw.githubusercontent.com/youssefwt/Movie-Mania/main/logo.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit(handleLogin)}>
          <h1>Sign In</h1>
          <input
            placeholder="Email"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email address",
              },
            })}
          />
          <span style={{ color: "#d26f6f" }}>{errors.email?.message}</span>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "password is required" })}
          />
          <span style={{ color: "#d26f6f" }}>{errors.password?.message}</span>
          <button className="loginButton">Sign In</button>
          <span>
            New to Netflix?{" "}
            <b
              onClick={() => {
                navigate("/register");
              }}
              style={{ cursor: "pointer" }}
            >
              Sign up now.
            </b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
