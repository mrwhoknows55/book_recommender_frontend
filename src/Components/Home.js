import "../CSS/Home.css";
import axios from "axios";
import instance from "../Utils/axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
// import useScroll from "../Utils/Hooks/useScroll";
import useFetchBook from "../Utils/Hooks/useFetchBook";
import Loading from "./Loading";
import Background from "./Background";
import Header from "./Header";
import Navbar from "./Navbar";
import Card from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const [name, setName] = useState("");
  const history = useHistory();

  // Setting default page as page 1 by using useState
  const [page, setPage] = useState(1);

  //Custom Hook For Fetching Book & destructring using [] & fetching errors & fetching loader
  const [books, nextPage, isLoading] = useFetchBook(page);

  // Custom Hook For Fetching Scroll Position for infinte scrolling
  // const scrollPosition = useScroll();

  // // USE EFFECT FOR SCROLLING
  // useEffect(() => {
  //   if (scrollPosition >= document.body.offsetHeight - window.innerHeight) {
  //     console.log("Im at the bottom");

  //     /* Load more books if available else print no books available*/

  //     nextPage ? setPage(page + 1) : <p>No Books available</p>;
  //   }
  //   // console.log(scrollPosition, window.innerHeight, document.body.offsetHeight);
  // }, [scrollPosition]);

  // GETTING THE TOKEN FROM SESSION STORAGE
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
    // history.replace("/signin");
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
      // history.replace("/signin");
    }
  };

  return (
    <>
      {/* {scrollPostion} */}

      <div className="home">
        {/* BACKGROUND DESIGN  COMPONENT ↓*/}
        <Background />

        {/* HEADING (TITLE) COMPONENT ↓*/}
        <Header />

        {/* NAVBAR COMPONENT ↓*/}
        <Navbar />

        {/* USED INFINTE SCROLL REACT COMPONENT FOR INFINTE SCROLLING & LOADING BOOKS */}
        <InfiniteScroll
          dataLength={books.length}
          next={() => {
            setPage(page + 1);
          }}
          hasMore={true}
        >
          {/* BOOKS CARD COMPONENT ↓*/}
          <div className="cards-wrap">
            {books.map((book) => {
              return (
                <Card
                  image={book.image_url}
                  author={book.authors}
                  title={book.title}
                  rating={4} /*{Math.floor(book.rating)}*/
                  id={book.book_id}
                />
              );
            })}
          </div>
        </InfiniteScroll>

        {/* LOADING STATE.... THEN IMPORT LOADING COMPONENT*/}
        {isLoading && <Loading />}
      </div>
    </>
  );
};

export default Home;
