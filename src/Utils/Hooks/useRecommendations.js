import { useEffect, useState } from "react";
import swal from "sweetalert";
import instance from "../axios";

export default function useRecommendations(page, searchTerm) {
  const [books, setBooks] = useState([]);
  //   const [searchBooks, setSearchBooks] = useState([]);

  const [nextPage, setNextPage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // RANDOM LOADING
  useEffect(() => {
    if (searchTerm) {
      return;
    }
    console.log("He");
    setIsLoading(true);
    instance
      .get(`books?page=${page}&limit=21`)
      .then((response) => {
        console.log(response.data.results);

        // ↓ In setBooks destructure the previous data which we have and add new data to the array ↓
        setNextPage(response.data.next);
        setBooks([...books, ...response.data.results]);
        setIsLoading(false);
      })
      .catch((e) => {
        swal("Alert", e, "error");
        setIsLoading(false);
      });
  }, [page]);
  return [books, nextPage, isLoading];
}
