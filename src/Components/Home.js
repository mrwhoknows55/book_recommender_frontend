import axios from "axios";
import React, {useState} from "react";
import "../CSS/Home.css";

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://api-book-recommender.herokuapp.com/api/`
});
const Home = () => {
  const [name, setName] = useState("");
  instance.get("user").then((resp) => setName(resp.data.name));

  return (
      <div className="home">
        <h1>Hello User</h1>
      </div>
  );
};

export default Home;
