import React, { useState } from "react";
import { useEffect } from "react";
import instance from "../Utils/axios";
import Card from "./Card";
import "../CSS/Library.css";

const Library = () => {
  const token = window.sessionStorage.getItem("token");
  const [library, setLibrary] = useState([]);
  useEffect(() => {
    instance
      .get(`library/`, {
        headers: { Authentication: token },
      })
      .then((response) => {
        console.log(response.data.results);
        setLibrary([...library, ...response.data.results]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="library">
      {/* <Navbar /> */}
      <h3 className="heading-books">Your Books</h3>
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
    </div>
  );
};

export default Library;
