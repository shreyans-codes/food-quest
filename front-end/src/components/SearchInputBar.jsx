import React, { useState } from "react";
import SearchResult from "./SearchResult";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  return [
    {
      value,
      onChange: (e) => {
        setValue(e.target.value);
      },
    },
    () => setValue(initialValue),
  ];
}

const SearchInputBar = () => {
  const [inputValue, resetInputValue] = useInput("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const submitSearch = (e) => {
    // console.log("Here and: ", inputValue);
    e.preventDefault();
    setLoading(true);
    console.log(inputValue);
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${
        inputValue.value
      }&apiKey=${import.meta.env.VITE_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data, i) => {
        console.log(data["results"]);
        setSearchResults(data["results"]);
        console.log("Search Result: ", searchResults);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
      });
    resetInputValue();
  };
  return (
    <div>
      <div className="w-fit m-auto">
        <div className="join">
          <input
            {...inputValue}
            className="w-auto input input-bordered input-primary join-item"
            placeholder="Enter what recipe to search?"
            size={50}
          />
          <button
            className="btn w-fit p-2 btn-primary btn-square join-item"
            onClick={submitSearch}
          >
            Search
          </button>
        </div>
      </div>
      {searchResults.length > 0 ? (
        loading ? (
          <div>Loading... </div>
        ) : error ? (
          <div>Error encountered</div>
        ) : (
          <SearchResult items={searchResults} />
        )
      ) : null}
    </div>
  );
};

export default SearchInputBar;
