import React, { useState } from "react";
import { useEffect } from "react";
import instance from "../Utils/axios";
import Card from "./Card";
import "../CSS/Library.css";
import { Subnav } from "./Subnav";
import Loading from "./Loading";

const Library = () => {
  const token = window.sessionStorage.getItem("token");
  const [library, setLibrary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    instance
      .get(`library/`, {
        headers: { Authentication: token },
      })
      .then((response) => {
        console.log(response.data.results);
        setLibrary([...library, ...response.data.results]);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="library">
      {/* <Navbar /> */}
      <Subnav />
      <div className="book-wrap">
        {library.map((item, index) => {
          return (
            <Card
              key={index}
              image={item.image_url}
              author={item.authors}
              title={item.title}
              rating={item.avg_rating}
              id={item.book_id}
            />
          );
        })}
      </div>
      {/* LOADING STATE.... THEN IMPORT LOADING COMPONENT*/}
      {isLoading && <Loading />}
    </div>
  );
};

export default Library;
