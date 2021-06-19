import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "../CSS/Home.css";
import instance from "../Utils/axios";

const Home = () => {
  const [name, setName] = useState("");
  const history = useHistory();
  const token = window.sessionStorage.getItem("token");

  if (token) {
    const instance = axios.create({
      withCredentials: true,
      baseURL: `https://api-book-recommender.herokuapp.com/api/`,
      headers: { Authentication: token },
    });
    instance.get("user").then((resp) => setName(resp.data.name));
  } else {
    window.sessionStorage.removeItem("token");
    history.replace("/signin");
  }
  const logOut = (e) => {
    e.preventDefault();

    if (token) {
      instance
        .post("logout", {
          headers: { Authentication: token },
        })
        .then((response) => {
          // TODO
          // if (response.data.success) {
          // }
        });
      window.sessionStorage.removeItem("token");
      history.replace("/signin");
    }
  };

  return (
    <div className="home">
      <h1>Hello {name ? name : "Guest"}</h1>
      <button
        className="logout__btn"
        onClick={(e) => {
          logOut(e);
        }}
      >
        LogOut
      </button>
    </div>
  );
};

export default Home;
