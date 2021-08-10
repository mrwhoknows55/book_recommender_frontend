import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useRecommendations from "../Utils/Hooks/useRecommendations";
import Card from "./Card";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Loading from "./Loading";
import "../CSS/Recommendations.css";
import { Subnav } from "./Subnav";

const Recommendations = () => {
  // Setting default page as page 1 by using useState
  const [page, setPage] = useState(1);

  const [books, nextPage, isLoading] = useRecommendations(page);
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
      <Subnav />

      {/* USED INFINTE SCROLL REACT COMPONENT FOR INFINTE SCROLLING & LOADING BOOKS */}
      <InfiniteScroll
        dataLength={books.length}
        next={() => {
          setPage(page + 1);
        }}
        hasMore={nextPage && nextPage !== null}
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
    </>
  );
};

export default Recommendations;
