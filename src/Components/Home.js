import "../CSS/Home.css";
import instance from "../Utils/axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import useFetchBook from "../Utils/Hooks/useFetchBook";
import Loading from "./Loading";
import Background from "./Background";
import Header from "./Header";
import Navbar from "./Navbar";
import Card from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const Home = () => {
  const [name, setName] = useState("");
  const history = useHistory();

  // Setting default page as page 1 by using useState
  const [page, setPage] = useState(1);

  //Custom Hook For Fetching Book & destructring using [] & fetching errors & fetching loader
  const [books, setBooks, nextPage, isLoading] = useFetchBook(page);
  // const res = books ||

  // GETTING THE TOKEN FROM SESSION STORAGE
  const token = window.sessionStorage.getItem("token");

  useEffect(() => {
    if (token) {
      instance
        .get("user", {
          headers: { Authentication: token },
        })
        .then((resp) => {
          setName(resp.data.name);
          console.log(resp.data.name);
        })
        .catch((e) => console.log(e));
    } else {
      window.sessionStorage.removeItem("token");
      history.replace("/signin");
    }
  }, []);

  //  BACK TO TOP BUTTON
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

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
            {books.map((book, index) => {
              return (
                <Card
                  key={index}
                  image={book.image_url}
                  author={book.authors}
                  title={book.title}
                  rating={book.avg_rating}
                  id={book.book_id}
                />
              );
            })}
          </div>
        </InfiniteScroll>

        {/* BACK TO TOP BUTTON */}
        {isVisible && (
          <div className="uparrow" onClick={scrollToTop}>
            <ArrowUpwardIcon className="up-icon" />
          </div>
        )}

        {/* LOADING STATE.... THEN IMPORT LOADING COMPONENT*/}
        {isLoading && <Loading />}
      </div>
    </>
  );
};

export default Home;
