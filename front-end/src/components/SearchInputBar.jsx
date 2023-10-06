import { SearchOutlined } from "@mui/icons-material";
import { IconButton, InputBase, Paper, Typography } from "@mui/material";
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
        // console.log("Search Result: ", searchResults);
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
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          margin: "2rem auto",
          justifyContent: "center",
          color: (t) => {
            return t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900];
          },
          width: 400,
        }}
      >
        <InputBase
          {...inputValue}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter what recipe to search?"
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={submitSearch}
        >
          <SearchOutlined />
        </IconButton>
      </Paper>
      {searchResults.length > 0 ? (
        loading ? (
          <Typography>Loading... </Typography>
        ) : error ? (
          <Typography>Error encountered</Typography>
        ) : (
          <SearchResult items={searchResults} />
        )
      ) : null}
    </div>
  );
};

export default SearchInputBar;
