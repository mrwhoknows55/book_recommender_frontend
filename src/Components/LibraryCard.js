import { useHistory } from "react-router";
import "../CSS/Card.css";
import StarRatings from "react-star-ratings";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import instance from "../Utils/axios";
import swal from "sweetalert";
const LibraryCard = (props) => {
  const { title, image, author, rating, id } = props;
  const history = useHistory();
  const token = window.sessionStorage.getItem("token");
  const book_id = sessionStorage.getItem("bookId");
  const viewBook = (e, id) => {
    e.preventDefault();
    sessionStorage.setItem("bookId", id);
    history.push("./book");
  };
  const removeBook = (e) => {
    e.preventDefault();
    console.log( `lib ${token}` );
    if (token) {
      // useEffect(() => {

      instance
        .delete(
          `library/${book_id}/`,
         
          {
            headers: { Authentication: token },
          }
        )
        .then((response) => {
          console.log(response.data);
          swal({
            title: "Done",
            text: response.data.message,
            icon: "success",
            button: "OK",
          });
        })
        .catch((e) => {
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
  }
  return (
    <div className="card-item">
      <div
        className="card-inner"
        // onClick={(e) => {
        //   viewBook(e, id);
        // }}
      >
        <img src={image} alt="Book" />
        <div className="add-go">
       <DeleteForeverIcon className="book-icon" onClick={(e) => {
       removeBook(e);
        }} >
        
         </DeleteForeverIcon>
         <div className="icon-content">Remove book</div>
       <MenuBookIcon className="menu-book" onClick={(e) => {
          viewBook(e, id);
        }}>
      
       </MenuBookIcon>
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
    </div>
  );
};

export default LibraryCard;