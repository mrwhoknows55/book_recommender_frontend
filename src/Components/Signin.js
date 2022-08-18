import React from "react";
import "../CSS/Signin.css";
import boyVector from "../Images/boy.svg";
import womenVector from "../Images/women.svg";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import instance from "../Utils/axios";
import emailValidation from "../Utils/emailValidation";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function Signin() {
  const history = useHistory();

  const signUpAnimate = (e) => {
    const container = document.querySelector("#animate");

    if (container) {
      container.classList.add("sign-up-mode");
    }
  };

  const signInAnimate = (e) => {
    const container = document.querySelector("#animate");
    if (container) {
      container.classList.remove("sign-up-mode");
    }
  };
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
          swal("Alert", error.toString(), "error");
        });
    } else {
      swal("Alert", "Please enter valid details. ", "error");
    }
  };

  return (
    <div className="Signin">
      <div className="container" id="animate">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
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
              <div className=""></div>
              <input
                type="submit"
                value="Sign in"
                className="btn solid"
                onClick={(e) => signIn(e)}
              />
            </form>
            {/* End of Sign in  */}

            {/* Start of Signup */}
            <Signup />
            {/* End of signup */}
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="signin-content">
              <h3>New here ?</h3>
              <p>Create a account with us and take benifits of our system.</p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={(e) => signUpAnimate(e)}
              >
                Sign up
              </button>
            </div>
            <img src={boyVector} alt="Boy" className="image" />
          </div>
          <div className="panel right-panel">
            <div className="signin-content">
              <h3>One of us ?</h3>
              <p>Then what you are doing here . . . . . .</p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={(e) => {
                  signInAnimate(e);
                }}
              >
                Sign in
              </button>
            </div>
            <img src={womenVector} alt="women" className="image" />
          </div>
        </div>
      </div>
    </div>
  );
}
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();
  const history = useHistory();

  const handleInput1 = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleInput2 = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleInput3 = (e) => {
    e.preventDefault();
    setPassword1(e.target.value);
  };

  const handleInput4 = (e) => {
    e.preventDefault();
    setPassword2(e.target.value);
  };

  const signUp = (e) => {
    e.preventDefault();

    console.log(name);
    console.log(email);
    console.log(password1);
    console.log(password2);

    if (
      name !== "" &&
      name !== undefined &&
      email !== "" &&
      email !== undefined &&
      emailValidation(email) &&
      password1 !== "" &&
      password1 !== undefined &&
      password2 !== "" &&
      password2 !== undefined &&
      password1 === password2
    ) {
      instance
        .post("signup", {
          name: name,
          email: email,
          password: password2,
        })
        .then(function (response) {
          if (response.status === 200) {
            window.sessionStorage.setItem("token", response.data.token);
            history.replace("/questions");
          }
        })
        .catch((error) => {
          swal("Alert", error.toString(), "error");
        });
    } else {
      swal("Alert", "Please enter valid details. ", "error");
    }
  };

  return (
    <div className="Signup">
      <form action="#" className="sign-up-form">
        <h2 className="title">Sign up</h2>

        <div className="input-field">
          <PersonIcon className="icon" />
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => handleInput1(e)}
          />
        </div>

        <div className="input-field">
          <EmailIcon className="icon" />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => handleInput2(e)}
          />
        </div>

        <div className="input-field">
          <LockIcon className="icon" />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => handleInput3(e)}
          />
        </div>

        <div className="input-field">
          <LockIcon className="icon" />
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => handleInput4(e)}
          />
        </div>

        <input
          type="submit"
          className="btn"
          value="Sign up"
          onClick={(e) => signUp(e)}
        />
      </form>
    </div>
  );
}

export { Signin, Signup };
