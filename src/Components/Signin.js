import React, { useState } from "react";
import { Link, Route, useHistory } from "react-router-dom";
import "../CSS/Signin.css";
/**import { FaUser } from "react-icons/fa";**/
import Signup from "./Signup";
import boyVector from "../Images/boy_vector_signin.svg";

const Signin = () => {
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
    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((resp) => {
      console.log(resp.json());
      // if(status == 200)
    });
    // fetch("http://localhost:8000/api/user").then((resp) =>
    //   console.log(resp.json())
    // );
    // <Route></Route>
    // });

    // console.log(this.input.value);
    // console.log("Password: ", e.password.value);
  };
  const signUp = (e) => {
    e.preventDefault();
    <Link to="/signup">
      <Signup />
    </Link>;
  };
  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" class="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
           
              <input type="text" placeholder="Email" onChange={handleInput1} />
            </div>

            <div className="input-field">
           
              <input
                type="password"
                placeholder="Password"
                onChange={handleInput2}
              />
            </div>

            <button type="submit" className="dark_btn" onClick={signIn}>
              Sign In
            </button>
          </form>
        </div>
      </div>
      <div className="panel-container">
        <div className="content">
          <h3>New Here?</h3>
          <p>Create an account with us and get benefits of our system</p>
          <button className="light_btn">SIGN UP</button>
        </div>
        <img src={boyVector} alt="Image" className="image" />
      </div>
    </div>
  );
};

export default Signin;
