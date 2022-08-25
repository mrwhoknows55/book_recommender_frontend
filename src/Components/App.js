import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Components/Home";
import { Signin } from "../Components/Signin";
import Book from "../Components/Book";
import Library from "../Components/Library";
import Recommendations from "../Components/Recommendations";
import "../CSS/App.css";
import { Questions } from "./Questions";
import Questions2 from "./Questions2";
// import Search from "./Search";
require('dotenv').config();

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/questions2">
            <Questions2 />
          </Route>
          <Route path="/questions">
            <Questions />
          </Route>
          <Route path="/recommendations">
            <Recommendations />
          </Route>
          <Route path="/library">
            <Library />
          </Route>
          <Route path="/book">
            <Book />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
