import React from "react";
import { useHistory } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import "../CSS/Subnav.css";

export const Subnav = () => {
  const history = useHistory();

  return (
    <div className="book-nav">
      <li
        className="goToHome"
        onClick={(e) => {
          history.push("/");
        }}
      >
        {<ArrowBackIcon className="back-icon" />}
      </li>

      <div className="book-nav-header">
        <h1>BOOK</h1>
        <h2>RECOMMENDER</h2>
      </div>
      <div className="book-links">
        {/*  <h1>HOME</h1>*/}

        <Link to="/library" className="book-library">
          LIBRARY
        </Link>
        <Link to="/recommendations" className="book-recomm">
          RECOMMENDATIONS
        </Link>
      </div>
    </div>
  );
};
