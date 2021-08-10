import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";
import "../CSS/Questions2.css";
import useDebounce from "../Utils/Hooks/useDebounce";
import { useQuesFetchBook } from "../Utils/Hooks/useQuesFetchBook";
import Loading from "./Loading";
import QuesCard from "./QuesCard";

const Questions2 = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState();
  const [books, nextPage, isLoading] = useQuesFetchBook(page, searchTerm);
  const history = useHistory();
  const debounce = useDebounce();

  const handleSearch = (e) => {
    const text = e.target.value;
    debounce(() => {
      setPage(1);
      setSearchTerm(text);
    });
  };
  return (
    <div>
      <div className="questions2">
        <div className="question2">
          <h3 className="que-head">QUESTIONS</h3>
          <p className="que-body">2. Which books you have read in past ?</p>
          <input
            type="search"
            placeholder="SEARCH"
            className="ques-search"
            onChange={(e) => {
              handleSearch(e);
            }}
          />

          <div className="buttons">
            <button
              className="next"
              onClick={(e) => {
                //   TODO
                history.replace("/");
              }}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
      <div className="infinteComponent">
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
                <QuesCard
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
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default Questions2;
