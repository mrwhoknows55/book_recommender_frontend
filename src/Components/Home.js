import axios from "axios";
import React, { useState } from "react";
import { Route, useHistory } from "react-router";
import "../CSS/Home.css";
import Signin from "./Signin";

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8000/api/",
});
const Home = () => {
  const [name, setName] = useState("");
  instance.get("user").then((resp) => setName(resp.data.name));

  return (
    <div className="home">
      <h1>Hello {name}</h1>
    </div>
  );
};

export default Home;
