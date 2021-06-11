import React from "react";
import { Link, Route, useHistory } from "react-router-dom";
import "../CSS/Signup.css";
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import womenVector from "../Images/vector_women.svg";
const Signup = () => {
  const history = useHistory();
  
   const signIn = (e) => {
    e.preventDefault();
    /**<Link to="/signup">
      <Signup />
    </Link>;**/
    history.push("/signIn");
   };
  return (
    <div className="container-1">
      <div className="forms-container-1">
        <div className="signin-signup-1">
          <form action="#" className="sign-up-form">
            <h2 className="title-1">Sign up</h2>
              <div className="input-field-signup">
              <PersonIcon  className = "icon"/>  <input type="text" placeholder="Username" />
              </div>

              <div className="input-field-signup">
              <EmailIcon className = "icon"/>  <input type="email" placeholder="Email" />
              </div>

              <div className="input-field-signup">
              <LockIcon className = "icon"/>  <input type="password" placeholder="Password" />
              </div>

               <div className="input-field-signup">
              <LockIcon className = "icon"/>  <input type="password" placeholder="Confirm Password" />
              </div>

              <input type="submit" class="dark_btn" value="Sign up" />
          </form>
        </div>
      </div>
       <div className="panel-container-1">
        <div className ="panel right-panel"></div>
          <div className="content">
            <h3>One of us ?</h3>
            <p>then what you are doing here....</p>
            <button className="light_btn" onClick={signIn} > 
            Sign In
          </button>
          </div>
          <img src={womenVector } alt="womenVector" className="image-1" />
        </div>
      </div>
    
  );
};

export default Signup;
