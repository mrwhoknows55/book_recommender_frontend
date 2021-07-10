import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import LockIcon from "@material-ui/icons/Lock";
import CancelIcon from '@material-ui/icons/Cancel';
import "../CSS/Navbar.css";
import "../CSS/annimation.css";
import { useState } from "react";
import useFetchBook from "../Utils/Hooks/useFetchBook";
import useDebounce from "../Utils/Hooks/useDebounce";
import Card from "../Components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { SidebarData } from "../Components/SidebarData";

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

  /* SIDEBAR STATE INITIALLY FALSE*/
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [searchbar, setSearchbar] = useState(false);

  const showSearchbar = () => setSearchbar(!searchbar);

  return (
    <>
      <div className="wrapper-nav">
        {/* DEMO NAVBAR HAMBURGER CODE STARTS here */}
        <div className="navbar">
          <Link to="#" className="menu-bars1">
            <MenuIcon className="hamburger" onClick={showSidebar} />
          </Link>
          <li className="main_nav_text">
            <h1> BOOK</h1>
            <h2>RECOMMENDER</h2>

          <div className="wrapper-search">
            <div className="search-field-nav">
                <SearchIcon className="icon" />
                <input
                  type="search"
                  className="search-box-nav"
                  placeholder="SEARCH"
                  onChange={(e) => {
                    handleSearch(e);
                  }}
                />
                <nav className={searchbar ? "nav-search active" : "nav-search"}>
                  <ul className="nav-search-items" onClick={showSearchbar}>
                <li className="cancel-icon">
                <CancelIcon />
                </li>
               
                </ul>
                </nav>
              </div>
            
          </div>
        </li>
          </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <CloseIcon />
              </Link>
            </li>
            <li className="navbar-name">
              <h1>BOOK</h1>
              <h2>RECOMMENDER</h2>
            </li>
            <div className="annimation-area">
              <ul className="box-area">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* DEMO NAVBAR HAMBURGER CODE ENDS here */}

        {/* Old Project Code starts from here down */}
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
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="#">LIBRARY</Link>
                <ul>
                  <Link to="#"> SORT</Link>
                </ul>
               
               
                {/* <ul>
                  <Link to="#">SORT</Link>
                </ul> */}
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
    </>
  );
};
export default Navbar;
