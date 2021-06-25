import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import "../CSS/Navbar.css";

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
            <li>
              <div className="search-field">
                <SearchIcon className="icon" />
                <input
                  type="search"
                  className="search-box"
                  placeholder="SEARCH"
                />
              </div>
            </li>

            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/library">LIBRARY</Link>
            </li>
            <li>
              <input type="submit" value="Logout" className="btn" />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
