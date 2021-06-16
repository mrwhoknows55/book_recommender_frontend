import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import "../CSS/Signup.css";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import womenVector from "../Images/vector_women.svg";
import instance from "../Utils/axios";
import emailValidation from "../Utils/emailValidation";
import swal from 'sweetalert';

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();
  const empty__input = document.querySelector(".empty__input");

  const signIn = (e) => {
    e.preventDefault();
    history.push("/signIn");
  };

  const handleInput1 = (e) => {
    e.preventDefault();
    setName(e.target.value);
    empty__input.innerHTML = "";
  };
  const handleInput2 = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    empty__input.innerHTML = "";
  };
  const handleInput3 = (e) => {
    e.preventDefault();
    setPassword1(e.target.value);
    empty__input.innerHTML = "";
  };
  const handleInput4 = (e) => {
    e.preventDefault();
    setPassword2(e.target.value);
    empty__input.innerHTML = "";
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
            history.replace("/");
          }
        })
        .catch((error) => {
          //TODO: change this later
          swal("Alert", error.toLocaleString(), "error");
        });
    } else {
       swal("Alert", "Please enter valid details. ", "error");
    }
  };
  return (
    <div className="container-1">
      <div className="forms-container-1">
        <div className="signin-signup-1">
          <form action="#" className="sign-up-form">
            <h2 className="title-1">Sign Up</h2>
            <div className="input-field-signup">
              <PersonIcon className="icon" />
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => handleInput1(e)}
              />
            </div>

            <div className="input-field-signup">
              <EmailIcon className="icon" />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => handleInput2(e)}
              />
            </div>

            <div className="input-field-signup">
              <LockIcon className="icon" />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => handleInput3(e)}
              />
            </div>

            <div className="input-field-signup">
              <LockIcon className="icon" />
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => handleInput4(e)}
              />
            </div>
            <div className="empty__input"/>
            <input
              type="submit"
              class="dark_btn"
              value="Sign Up"
              onClick={(e) => {
                signUp(e);
              }}
            />
          </form>
        </div>
      </div>
      <div className="panel-container-1">
        <div className="panel right-panel"/>
        <div className="content">
          <h3>One of us ?</h3>
          <p>then what you are doing here....</p>
          <button className="light_btn" onClick={signIn}>
            Sign In
          </button>
        </div>
        <img src={womenVector} alt="womenVector" className="image-1" />
      </div>
    </div>
  );
};

export default Signup;
