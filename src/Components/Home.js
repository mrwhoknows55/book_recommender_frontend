import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import LockIcon from "@material-ui/icons/Lock";
import { Link } from "react-router-dom";

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
import useDebounce from "../Utils/Hooks/useDebounce";

const Home = () => {
  const [name, setName] = useState("");
  const history = useHistory();

  // Setting default page as page 1 by using useState
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState();

  //Custom Hook For Fetching Book & destructring using [] & fetching errors & fetching loader
  const [books, nextPage, isLoading] = useFetchBook(page, searchTerm);

  // const res = books ||

  // GETTING THE TOKEN FROM SESSION STORAGE
  const token = window.sessionStorage.getItem("token");
  const debounce = useDebounce();

  const handleSearch = (e) => {
    const text = e.target.value;
    debounce(() => setSearchTerm(text));
  };
  // LOGOUT
  const logOut = (e) => {
    history.replace("/signin");
    window.sessionStorage.removeItem("token");
  };

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

  // Show button when page is scrolled upto given distance
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
      <div className="home">
        {/* BACKGROUND DESIGN  COMPONENT ↓*/}
        <Background />

        {/* HEADING (TITLE) COMPONENT ↓*/}
        <Header />

        {/* NAVBAR COMPONENT ↓*/}
        {/* <Navbar /> */}
        <nav className="main-nav">
          <label for="show-menu" className="menu-icon">
            <MenuIcon />
          </label>
          <div className="content">
            <ul className="links">
              <li>
                <div className="search-field">
                  <SearchIcon className="icon" />
                  <input
                    type="search"
                    className="search-box"
                    placeholder="SEARCH"
                    onChange={(e) => {
                      handleSearch(e);
                    }}
                  />
                </div>
              </li>

              <li>
                <Link to="/recommendations">RECOMMENDATIONS</Link>
              </li>
              <li>
                <Link to="/library">LIBRARY</Link>
                <ul>
                  <Link to="#"> SORT</Link>
                </ul>
              </li>
              <li
                className="login"
                onClick={(e) => {
                  logOut(e);
                }}
              >
                <LockIcon className="loginIcon" />

                <button className="loginBtn">Logout</button>
              </li>
            </ul>
          </div>
        </nav>

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
