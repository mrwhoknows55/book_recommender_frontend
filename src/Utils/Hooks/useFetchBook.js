import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import instance from "../axios";

export default function useFetchBook(page) {
  const [books, setBooks] = useState([]);

  const [nextPage, setNextPage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    instance
      .get(`books?page=${page}&limit=27`)
      .then((response) => {
        console.log(response.data.results);

        // ↓ In setBooks destructure the previous data which we have and add new data to the array ↓
        setNextPage(response.data.next);
        setBooks([...books, ...response.data.results]);
        setIsLoading(false);
      })
      .catch((e) => {
        swal("Alert", e.response.statusText, "error");
        setIsLoading(false);
      });
  }, [page]);
  return [books, nextPage, isLoading];
}
