import { useHistory } from "react-router";
import "../CSS/Card.css";
import StarRatings from "react-star-ratings";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import instance from "../Utils/axios";
import swal from "sweetalert";
import Loading from "./Loading";
import { useState } from "react";
const QuesCard = (props) => {
  const { title, image, author, rating, id } = props;
  const history = useHistory();
  const token = window.sessionStorage.getItem("token");
  const book_id = sessionStorage.getItem("bookId");
  const [isLoading, setIsLoading] = useState(false);

  const postBook = (e) => {
    e.preventDefault();

    console.log({ token });
    setIsLoading(true);
    if (token) {
      // useEffect(() => {

      instance
        .post(
          `library/${id}/`,
          {},
          {
            headers: { Authentication: token },
          }
        )
        .then((response) => {
          setIsLoading(false);
          console.log(response.data);
          swal({
            title: "Done",
            text: response.data.message,
            icon: "success",
            button: "OK",
          });
        })
        .catch((e) => {
          setIsLoading(false);
          console.log(e);
        });
      instance
        .get(`library/`, {
          headers: { Authentication: token },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
      // }, []);
    }
  };
  return (
    <div className="card-item">
      <div className="card-inner">
        <img src={image} alt="Book" />
        <div className="add-go">
          <BookmarkIcon
            className="book-icon"
            onClick={(e) => {
              postBook(e);
            }}
          ></BookmarkIcon>
          <div className="icon-content">Add to library</div>
        </div>
        <div className="roll-name">
          <p id="author">{author}</p>
          <p id="title">{title}</p>
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

export default QuesCard;
