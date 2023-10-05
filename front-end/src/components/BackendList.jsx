import { Button, Typography } from "@mui/material";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import React, { useCallback, useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { DeleteOutline } from "@mui/icons-material";
import jwt_token from "../variables/jwt_token";

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
myHeaders.append("Cookie", "JSESSIONID=863EF35CE0D4CF579E1D3EFDC80AA317");
const deleteData = (id) => {
  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
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
              <div>
                <RecipeCard item={itemSet} key={item.id} />
                <Button
                  sx={{
                    marginLeft: "0.7em",
                  }}
                  onClick={() => deleteData(item.id)}
                  startIcon={<DeleteOutline />}
                  color="error"
                >
                  Delete
                </Button>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default BackendList;
