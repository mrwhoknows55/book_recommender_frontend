import { Link, useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import LockIcon from "@material-ui/icons/Lock";
import CancelIcon from "@material-ui/icons/Cancel";
import "../CSS/Navbar.css";
import "../CSS/annimation.css";
import { useState } from "react";
import useFetchBook from "../Utils/Hooks/useFetchBook";
import useDebounce from "../Utils/Hooks/useDebounce";
import { SidebarData } from "../Components/SidebarData";

const Navbar = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState();

  /* Debounce is a custom hook for setting timeout in search field after key pressed */
  const debounce = useDebounce();

  const handleSearch = (e) => {
    const text = e.target.value;
    debounce(() => setSearchTerm(text));
  };

  // PASSING THE SEARCH TERM TO FETCH BOOK HOOK
  useFetchBook(1, searchTerm);
  // useSearchBook(searchTerm);

  /* SIDEBAR STATE INITIALLY FALSE*/
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  /* SEARCHBAR STATE INITIALLY FALSE*/
  const [searchbar, setSearchbar] = useState(false);
  const showSearchbar = () => setSearchbar(!searchbar);

  // LOGOUT
  const logOut = (e) => {
    history.replace("/signin");
    window.sessionStorage.removeItem("token");
  };

  return (
    <>
      <div className="wrapper-nav">
        {/* NAVBAR HAMBURGER CODE STARTS here */}
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

        {/*NAVBAR HAMBURGER CODE ENDS here */}

        {/* REGULAR NAVBAR CODE STARTS */}
        {/* <nav className="main-nav">
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
        </nav> */}
      </div>
    </>
  );
};
export default Navbar;
