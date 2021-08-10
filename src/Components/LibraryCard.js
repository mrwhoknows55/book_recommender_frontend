import { useHistory } from "react-router";
import "../CSS/Card.css";
import StarRatings from "react-star-ratings";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import instance from "../Utils/axios";
import swal from "sweetalert";
import { useState } from "react";
import Loading from "./Loading";

const LibraryCard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { title, image, author, rating, id } = props;
  const history = useHistory();
  const token = window.sessionStorage.getItem("token");

  const viewBook = (e, id) => {
    e.preventDefault();
    sessionStorage.setItem("bookId", id);
    history.push("./book");
  };
  const removeBook = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (token) {
      instance
        .delete(`library/${id}/`, {
          headers: { Authentication: token },
        })
        .then((response) => {
          console.log(response.data);
          setIsLoading(false);
          swal({
            title: "Done",
            text: response.data.message,
            icon: "success",
            button: "OK",
          });
          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
          window.location.reload();
        });
    }
  };
  return (
    <div className="card-item">
      <div className="card-inner">
        <img src={image} alt="Book" />
        <div className="add-go">
          <DeleteForeverIcon
            className="book-icon"
            onClick={(e) => {
              removeBook(e);
            }}
          ></DeleteForeverIcon>
          <div className="icon-content">Remove book</div>
          <MenuBookIcon
            className="menu-book"
            onClick={(e) => {
              viewBook(e, id);
            }}
          ></MenuBookIcon>
          <div className="icon-content">View Book</div>
        </div>

        <div className="roll-name">
          <p>{author}</p>
          <p>{title}</p>
        </div>
        <div className="rating">
          {
            <StarRatings
              rating={rating}
              starRatedColor="#EEC73C"
              starEmptyColor="#949494"
              starDimension="20px"
              starSpacing="2px"
              className="star_rating"
            />
          }
        </div>
      </div>
      {/* LOADING STATE.... THEN IMPORT LOADING COMPONENT*/}
      {isLoading && <Loading />}
    </div>
  );
};

export default LibraryCard;
