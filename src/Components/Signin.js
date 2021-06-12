import React, { useState } from "react";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import { useHistory } from "react-router-dom";
import "../CSS/Signin.css";
import boyVector from "../Images/boy_vector_signin.svg";
import instance from "../Utils/axios";
import emailValidation from "../Utils/emailValidation";

const Signin = () => {
  const history = useHistory();

  const signUp = (e) => {
    e.preventDefault();
    history.push("/signup");
  };

  return (
    <div className="container">
      <SigninForm />
      <div className="panel-container">
        <div className="content">
          <h3>New Here?</h3>
          <p>Create an account with us and get benefits of our system</p>
          <button
            className="light_btn"
            onClick={(e) => {
              signUp(e);
            }}
          >
            Sign Up
          </button>
        </div>
        <img src={boyVector} alt="Boy" className="image" />
      </div>
    </div>
  );
};
const SigninForm = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  const handleInput1 = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleInput2 = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const signIn = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    const empty__input = document.querySelector(".empty__input");
    if (
      email !== "" &&
      email !== undefined &&
      emailValidation(email) &&
      password !== "" &&
      password !== undefined
    ) {
      instance
        .post("login", {
          email: email,
          password: password,
        })
        .then(function (response) {
          if (response.status === 200) {
            window.sessionStorage.setItem("token", response.data.token);
            history.replace("/");
          }
        })
        .catch((error) => {
          const output = `<small>${error}</small>`;
          empty__input.innerHTML = output;
        });
    } else {
      const output = `<small>Please enter valid details.</small>`;
      empty__input.innerHTML = output;
    }
  };
  return (
    <div className="forms-container">
      <div className="signin-signup">
        <form action="#" class="sign-in-form">
          <h2 className="title">Sign in</h2>
          <div className="input-field">
            <EmailIcon className="icon" />
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => handleInput1(e)}
              required
            />
          </div>

          <div className="input-field">
            <LockIcon className="icon" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => handleInput2(e)}
              required
            />
          </div>
          <div className="empty__input"></div>

          <button type="submit" className="dark_btn" onClick={(e) => signIn(e)}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signin;
