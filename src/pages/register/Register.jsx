import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.scss";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleStart = async () => {
    //validate email
    if (emailRef.current.value === "") {
      Swal.fire({
        confirmButtonText: "OK",
        confirmButtonColor: "#f44336",
        width: "20rem",
        text: "Email is required",
      });
      return;
    }
    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailRef.current.value)
    ) {
      Swal.fire({
        confirmButtonText: "OK",
        confirmButtonColor: "#f44336",
        width: "20rem",
        text: "Invalid email address",
      });
      return;
    }

    const res = await axios.post("/auth/check-email", {
      email: emailRef.current.value,
    });
    if (res.data.exists) {
      Swal.fire({
        text: "Email already exists",
        confirmButtonText: "OK",
        confirmButtonColor: "#f44336",
        width: "20rem",
      });
    } else {
      setEmail(emailRef.current.value);
    }
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    //validate password
    if (password === "") {
      Swal.fire({
        confirmButtonText: "OK",
        confirmButtonColor: "#f44336",
        width: "20rem",
        text: "Password is required",
      });
      return;
    }

    setPassword(passwordRef.current.value);
    console.log("password ", password);
    await axios.post("/auth/register", {
      email,
      password,
      userName: email.split("@")[0],
    });
    navigate("/login");
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://raw.githubusercontent.com/youssefwt/Movie-Mania/main/logo.png"
            alt=""
          />
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="loginButton"
          >
            Sign in
          </button>
        </div>
      </div>
      <div className="register_container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        {!email ? (
          <div className="input">
            <input placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get started
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="password"
              required
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              ref={passwordRef}
            />
            <button className="registerButton" onClick={handleFinish}>
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
