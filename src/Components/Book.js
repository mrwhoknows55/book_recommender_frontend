import React, { useState } from "react";
import { useLocation } from "react-router";
import "../CSS/Book.css";
import instance from "../Utils/axios";

function Book() {
  // console.log(useLocation());
  // const book_id = useLocation().state.book_id;
  const book_id = sessionStorage.getItem("bookId");
  instance.get(`books/${book_id}`).then((response) => {
    console.log(response);
  });
  return <div className="book">{book_id}</div>;
}

export default Book;
