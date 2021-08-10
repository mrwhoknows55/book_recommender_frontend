import { useEffect, useState } from "react";
import swal from "sweetalert";
import instance from "../axios";

export default function useFetchBook(page, searchTerm, filterSelect) {
  const [books, setBooks] = useState([]);

  const [nextPage, setNextPage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let filterParam = `books?page=${page}&limit=21`;
    switch (filterSelect) {
      case 0:
        filterParam = "title";
        break;
      case 1:
        filterParam = "-title";
        break;
      case 2:
        filterParam = "avg_rating";
        break;
      case 3:
        filterParam = "-avg_rating";
        break;
      case 4:
        filterParam = "author";
        break;
      case 5:
        filterParam = "-author";
        break;
      default:
        filterParam = "";
        break;
    }
    let finalUrl = `books?ordering=${filterParam}&page=${page}&limit=21`;
    if (searchTerm && searchTerm != "")
      finalUrl = `books?search=${searchTerm}&ordering=${filterParam}&page=${page}&limit=21`;
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
  }, [filterSelect, page, searchTerm]);

  return [books, nextPage, isLoading];
}
