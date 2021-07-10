import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Components/Home";
import { Signin } from "../Components/Signin";
import Book from "../Components/Book";
import Library from '../Components/Library'
import "../CSS/App.css";
import Search from "./Search";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/search">
            <Search />
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
