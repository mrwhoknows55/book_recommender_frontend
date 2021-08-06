import { useEffect, useState } from "react";
import swal from "sweetalert";
import instance from "../axios";

export default function useFetchBook(page, searchTerm) {
  const [books, setBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);

  const [nextPage, setNextPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  

  // RANDOM LOADING
  useEffect(() => {
    if (searchTerm && searchTerm !== "") {
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

  useEffect(() => {
    console.log(searchTerm);
    if (searchTerm === undefined || searchTerm === "") {
      instance
        .get(`books?page=1&limit=21`)
        .then((response) => {
          console.log(response.data.results);

          // ↓ In setBooks destructure the previous data which we have and add new data to the array ↓
          setNextPage(response.data.next);
          setBooks([...response.data.results]);
          setIsLoading(false);
        })
        .catch((e) => {
          swal("Alert", e, "error");
          setIsLoading(false);
        });
      return [books, nextPage, isLoading];
    }
    console.log("SHe");
    setIsLoading(true);
    instance
      .get(`books?search=${searchTerm}`)
      .then((res) => {
        console.log(res.data.results);
        setBooks([...res.data.results]);
        setIsLoading(false);
      })
      .catch((e) => {
        swal("Alert", e.response.statusText, "error");
        setIsLoading(false);
      });
  }, [searchTerm]);
  return [books, nextPage, isLoading];
}
