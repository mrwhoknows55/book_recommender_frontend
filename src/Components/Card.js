import { useHistory } from "react-router";
import "../CSS/Card.css";
import StarRatings from "react-star-ratings";
const Card = (props) => {
  const { title, image, author, rating, id } = props;
  const history = useHistory();
  const viewBook = (e, id) => {
    e.preventDefault();
    // history.push({
    //   pathname: "/book",
    //   state: {
    //     book_id: id,
    //   },
    // });
    sessionStorage.setItem("bookId", id);
    history.push("./book");
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
    </div>
  );
};

export default Card;
