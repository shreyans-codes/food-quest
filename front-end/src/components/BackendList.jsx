import { Button, Typography } from "@mui/material";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { useCallback, useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { DeleteOutline } from "@mui/icons-material";
import myHeaders from "../variables/myHeaders";

var backendHeaders = myHeaders;
const deleteData = (id) => {
  var requestOptions = {
    method: "DELETE",
    headers: backendHeaders,
    redirect: "follow",
  };

  fetch(`http://localhost:8080/api/recipe/delete/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const BackendList = () => {
  const [recipe, setRecipe] = useState([]);
  const fetchData = useCallback(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/recipe", requestOptions)
      .then((response) => response.json())
      .then((result, i) => {
        setRecipe(result);
        console.log(recipe);
      })
      .catch((error) => console.log("ERROR: ", error));
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <Typography
        variant="h3"
        style={{
          marginLeft: "3rem",
        }}
      >
        From the database
      </Typography>
      <Splide
        tag="section"
        options={{
          perPage: 4,
          drag: "free",
          pagination: false,
          padding: "3rem",
          gap: "5rem",
        }}
      >
        {recipe.map((item) => {
          const itemSet = {
            title: item.title,
            image: item.imageUrl,
            summary: item.description,
          };
          console.log(item.name);
          return (
            <SplideSlide key={item.id}>
              <RecipeCard
                item={itemSet}
                key={item["id"]}
                deleteButton={true}
                onDeleteClick={() => deleteData(item.id)}
              />
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default BackendList;
