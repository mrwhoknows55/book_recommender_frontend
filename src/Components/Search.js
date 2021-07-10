import React from "react";
import useFetchBook from "../Utils/Hooks/useFetchBook";

const Search = () => {
  const [searchBooks] = useFetchBook(1);
  return (
    <div>
      {searchBooks.map((search, index) => {
        return (
          <>
            <div>{search.title}</div>
            {/* <div>{search.authors}</div> */}
          </>
        );
      })}
    </div>
  );
};

export default Search;
