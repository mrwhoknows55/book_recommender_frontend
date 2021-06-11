import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../Components/Header";
import Home from "../Components/Home";
import Signin from "../Components/Signin";
import Signup from "../Components/Signup";
import "../CSS/App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signin">
            <Signin />
          </Route>
           <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route> 
        </Switch>
      </div>
    </Router>
  );
};

export default App;
