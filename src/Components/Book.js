import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import "../CSS/Book.css";
import instance from "../Utils/axios";
import Header from "./Header";
import Navbar from "./Navbar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import StarRatings from "react-star-ratings";
import swal from "sweetalert";
function Book() {
  // console.log(useLocation());
  // const book_id = useLocation().state.book_id;
  // GETTING THE TOKEN FROM SESSION STORAGE
  const token = window.sessionStorage.getItem("token");
  const [bookIndividual, setBookIndividual] = useState([]);
  const book_id = sessionStorage.getItem("bookId");
  const history = useHistory();
  useEffect(() => {
    instance
      .get(`books/${book_id}/`)
      .then((response) => {
        console.log(response.data);
        setBookIndividual([response.data]);
      })
      .catch((e) => console.log(e));
  }, []);

  const postBook = (e) => {
    e.preventDefault();
    console.log({ token });
    if (token) {
      // useEffect(() => {

      instance
        .post(
          `library/${book_id}`,
          {},
          {
            headers: { Authentication: token },
          }
        )
        .then((response) => {
          console.log(response.data);
          swal({
            title: "Done",
            text: response.data.message,
            icon: "success",
            button: "OK",
          });
        })
        .catch((e) => {
          console.log(e);
        });
      instance
        .get(`library/`, {
          headers: { Authentication: token },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
      // }, []);
    }
  };
  return (
    <div className="book">
      {/* HEADING (TITLE) COMPONENT ↓*/}
      {/* <Header /> */}

      {/* NAVBAR COMPONENT ↓*/}
      {/* <Navbar /> */}
      {/* {book_id} */}

      <div className="book-details">
        {bookIndividual.map((item, index) => {
          return (
            <>
              <img src={item.image_url} alt="Book" className="book-image" />

              <div className="book-details-other" key={index}>
                <h3 className="book-title">{item.title}.</h3>
                <h4 className="book-author">
                  {item.authors} <small>(AUTHOR).</small>
                </h4>
                <p className="book-rating">
                  <strong>Rated by:</strong> {item.ratings_count} readers.
                  <div className="star_rating">
                    <StarRatings
                      rating={item.avg_rating}
                      starRatedColor="#FFC759"
                      starEmptyColor="#5F5C53"
                      starDimension="20px"
                      starSpacing="2px"
                    />
                  </div>
                </p>

                <button
                  className="goToLibrary"
                  onClick={(e) => {
                    postBook(e);
                  }}
                >
                  {<LibraryBooksIcon className="libraray-icon" />}
                  <p>Add to Library</p>
                </button>
                <p className="book-description">{item.description}</p>
              </div>
            </>
          );
        })}
      </div>
      <button
        className="goToHome"
        onClick={(e) => {
          history.push("/");
        }}
      >
        {<ArrowBackIcon />}
        <p>Back to Home</p>
      </button>
    </div>
  );
}

export default Book;
