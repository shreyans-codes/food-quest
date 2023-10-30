import { Typography } from "@mui/material";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { useEffect, useState } from "react";
import "@splidejs/react-splide/css";
import RecipeCard from "./RecipeCard";
import myHeaders from "../variables/myHeaders";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "../redux/recipeListSlice";

const saveData = (raw) => {
  var popularHeader = myHeaders;
  
  
  var requestOptions = {
    method: "POST",
    headers: popularHeader,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:8080/api/recipe", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    // console.log(result);
  })
  .catch((error) => console.log("error", error));
};

const Popular = () => {
  const recipeList = useSelector((state) => state.recipeCollection.recipeList);
  const dispatch = useDispatch()
  const [popular, setPopular] = useState([]);
  const numberOfRecipes = 10;
  const storageVal = "popular";
  const tags = ["vegetarian"];
  useEffect(() => {
    const check = localStorage.getItem(storageVal);
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${
          import.meta.env.VITE_APP_API_KEY
        }&number=${numberOfRecipes}&tags=${tags}`
      )
        .then((response) => response.json())
        .then((data, i) => {
          setPopular(data["recipes"]);
          localStorage.setItem(storageVal, JSON.stringify(data.recipes));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          marginLeft: "3rem",
        }}
      >
        Popular Picks
      </Typography>
      <Splide
        tag="section"
        options={{
          perPage: 4,
          pagination: false,
          drag: "free",
          padding: "3rem",
          gap: "5rem",
        }}
      >
        {popular.map((item) => {
          const itemSet = {
            title: item["title"],
            image: item["image"],
            summary: item["summary"],
          };
          return (
            <SplideSlide key={item.id}>
              <div>
                <RecipeCard
                  item={itemSet}
                  key={item["id"]}
                  saveButton={true}
                  onSaveClick={() => {
                    var raw = JSON.stringify({
                      title: item.title,
                      description: item.summary,
                      imageUrl: item.image,
                    });
                    saveData(raw);
                    dispatch(addRecipe(itemSet));
                    console.log(recipeList)
                  }}
                ></RecipeCard>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </>
  );
};

export default Popular;
