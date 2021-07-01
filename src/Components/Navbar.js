import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import LockIcon from "@material-ui/icons/Lock";
import "../CSS/Navbar.css";
import { useState } from "react";
import useFetchBook from "../Utils/Hooks/useFetchBook";
import useDebounce from "../Utils/Hooks/useDebounce";
import Card from "../Components/Card";
import InfiniteScroll from "react-infinite-scroll-component";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [page, setPage] = useState(1);

  /* Debounce is a custom hook for setting timeout in search field after key pressed */
  const debounce = useDebounce();

  const handleSearch = (e) => {
    const text = e.target.value;
    debounce(() => setSearchTerm(text));
  };
  const [books, nextPage, isLoading] = useFetchBook(page, searchTerm);

  return (
    <div className="wrapper-nav">
      <nav>
      <input type="checkbox"
        id="check"
        />
        <label for="show-menu" className="menu-icon">
          <MenuIcon />
        </label>
        <div className="content">
          <div className="logo">
            <a href={"#"}></a>
          </div>
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
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/library">LIBRARY</Link>
            </li>
            <li className="login">
              <LockIcon className="loginIcon" />

              <button className="loginBtn">Logout</button>
            </li>
          </ul>
          </div>
      </nav>
      {/* <InfiniteScroll
          dataLength={books.length}
          next={() => {
            setPage(page + 1);
          }}
          hasMore={true}
        >
           //BOOKS CARD COMPONENT ↓
          <div className="cards-wrap">
            {books.map((book) => {
              return (
                <Card
                  image={book.image_url}
                  author={book.authors}
                  title={book.title}
                  rating={4} //{Math.floor(book.rating)}
                  id={book.book_id}
                />
              );
            })}
          </div>
        </InfiniteScroll> */}
    </div>
  );
};
export default Navbar;
