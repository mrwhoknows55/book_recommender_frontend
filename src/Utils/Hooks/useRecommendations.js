import { useEffect, useState } from "react";
import swal from "sweetalert";
import instance from "../axios";

export default function useRecommendations(page) {
  const token = window.sessionStorage.getItem("token");

  const [books, setBooks] = useState([]);

  const [nextPage, setNextPage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    instance
      .get(`recom/?page=${page}&limit=21`, {
        headers: { Authentication: token },
      })
      .then((response) => {
        console.log(response.data.results);

        // ↓ In setBooks destructure the previous data which we have and add new data to the array ↓
        setNextPage(response.data.next);
        if (page === 1) {
          setBooks([...response.data.results]);
        } else {
          setBooks([...books, ...response.data.results]);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        swal("Alert", e, "error");
        setIsLoading(false);
      });
  }, [page]);
  return [books, nextPage, isLoading];
}
