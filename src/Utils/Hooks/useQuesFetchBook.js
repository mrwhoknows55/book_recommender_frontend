import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import instance from "../axios";

export const useQuesFetchBook = (page, searchTerm) => {
  const [books, setBooks] = useState([]);

  const [nextPage, setNextPage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    let finalUrl = `books?page=${page}&limit=21`;
    if (searchTerm && searchTerm !== "")
      finalUrl = `books?search=${searchTerm}&page=${page}&limit=21`;
    console.log(finalUrl);
    instance
      .get(finalUrl)
      .then((res) => {
        console.log(res.data.results);
        if (page === 1) {
          setBooks([...res.data.results]);
        } else {
          setBooks([...books, ...res.data.results]);
        }
        setNextPage(res.data.next);
        setIsLoading(false);
      })
      .catch((e) => {
        swal("Alert", e.response.statusText, "error");
        setIsLoading(false);
      });
  }, [page, searchTerm]);

  return [books, nextPage, isLoading];
};
