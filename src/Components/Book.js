import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "../CSS/Book.css";
import instance from "../Utils/axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import StarRatings from "react-star-ratings";
import ReadMoreReact from "read-more-react";
import swal from "sweetalert";

function Book() {
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
        </div>
      </div>
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
                <p className="book-history">
                  <p className="book-year">
                    Publication Year : {item.original_publication_year}
                  </p>
                  <p className="book-year">Genre : {item.genre}</p>
                </p>
                <p className="book-rating">
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
                <p className="book-description">
                  <ReadMoreReact
                    text={item.description}
                    min="100"
                    ideal="150"
                    max="200"
                    readMoreText="Read More..."
                  />
                </p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Book;
