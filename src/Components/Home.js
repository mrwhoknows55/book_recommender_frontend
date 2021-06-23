import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "../CSS/Home.css";
import background from "../Images/background.png";
import instance from "../Utils/axios";
import MenuIcon from "@material-ui/icons/Menu";
import useScroll from "../Utils/Hooks/useScroll";
import useFetchBook from "../Utils/Hooks/useFetchBook";
import swal from "sweetalert";

const Home = () => {
  const [name, setName] = useState("");
  const history = useHistory();

  // Setting default page as page 1 by using useState
  const [page, setPage] = useState(1);

  //Custom Hook For Fetching Book & destructring using [] & fetching errors
  const [books, nextPage] = useFetchBook(page);

  const scrollPostion = useScroll();
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
      {scrollPostion}

      <div className="home">
        <Background /> {/* BACKGROUND DESIGN  COMPONENT ↓*/}
        <Header />
        {/* HEADING (TITLE) COMPONENT ↓*/}
        <Navbar />
        {/* NAVBAR COMPONENT ↓*/}
        {/* BOOKS CARD COMPONENT ↓*/}
        <div className="cards-wrap">
          {books.map((book) => {
            return (
              <Card
                image={book.image_url}
                author={book.authors}
                title={book.title}
                rating={4} //TOdo Rating
                id={book.book_id}
              />
            );
          })}
        </div>
        
        {/* Load more button if books available else print no books available*/}
        {nextPage ? (
          <button
            onClick={(e) => {
              console.log("Button clicked");
              setPage(page + 1);
            }}
          >
            Load More
          </button>
        ) : (
          <p>No Books available</p>
        )}
      </div>
    </>
  );
};

// BACKGROUND COMPONENT ↓
const Background = () => {
  return (
    <div className="background">
      <img src={background} alt="Background" />
    </div>
  );
};

//HEADER COMPONENT ↓
const Header = () => {
  return (
    <div className="header-box">
      <div className="header">
        <h1>BOOK</h1>
        <h2>RECOMMENDER</h2>
        {/* <div class="footer"></div> */}
      </div>
    </div>
  );
};

//NAVBAR COMPONENT ↓
const Navbar = () => {
  return (
    <div className="wrapper-nav">
      <nav>
        <label for="show-menu" className="menu-icon">
          <MenuIcon />
        </label>
        <div className="content">
          <div className="logo">
            <a href={"#"}></a>
          </div>
          <ul className="links">
            <input type="search" className="search-box" placeholdre="SEARCH" />
            <Link to="/">
              <li>HOME</li>
            </Link>
            <Link to="/library">
              <li>MY LIBRARY</li>
            </Link>
            <input type="submit" value="Logout" className="btn" />
          </ul>
        </div>
      </nav>
    </div>
  );
};

// CARD COMPONENT ↓
const Card = (props) => {
  const { title, image, author, rating, id } = props;
  const history = useHistory();
  const viewBook = (e, id) => {
    e.preventDefault();
    history.push({
      pathname: "/book",
      state: {
        book_id: id,
      },
    });
  };
  return (
    <div className="card-item">
      <div
        className="card-inner"
        onClick={(e) => {
          viewBook(e, id);
        }}
      >
        <img src={image} alt="Book" />
        <div className="roll-name">
          <p>{author}</p>
          <p>{title}</p>
        </div>
        <div className="rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
