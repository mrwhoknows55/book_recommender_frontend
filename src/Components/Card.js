import { useHistory } from "react-router";
import "../CSS/Card.css";

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
            .map((i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
