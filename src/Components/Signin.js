import React, { useState } from "react";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import { useHistory } from "react-router-dom";
import "../CSS/Signin.css";
import boyVector from "../Images/boy_vector_signin.svg";
import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://api-book-recommender.herokuapp.com/api/`,
});

const Signin = () => {
  const signUp = (e) => {
    e.preventDefault();
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
            onClick={() => {
              signUp();
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

    const passwordInvalid = document.querySelector(".password__invalid");
    if (email === "" || password === "") {
      const output = `<small>Please enter valid details.</small>`;
      passwordInvalid.innerHTML = output;
    } else {
      instance
        .post("login", {
          email: email,
          password: password,
        })
        .then(function (response) {
          // console.log(response);

          if (response.status === 200) {
            history.replace("/");
          }
        })
        .catch((error) => {
          // alert(error);

          const output = `<small>${error}</small>`;
          passwordInvalid.innerHTML = output;
        });
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
            />
          </div>

          <div className="input-field">
            <LockIcon className="icon" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => handleInput2(e)}
            />
          </div>
          <div className="password__invalid"></div>

          <button type="submit" className="dark_btn" onClick={(e) => signIn(e)}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signin;
