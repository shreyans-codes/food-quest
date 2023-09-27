import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import React, { useEffect, useState } from "react";
import "@splidejs/react-splide/css";
import RecipeCard from "./RecipeCard";
import { SaveAlt } from "@mui/icons-material";
import jwt_token from "../variables/jwt_token";

const saveData = (item) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  myHeaders.append("Authorization", `Bearer ${jwt_token}`);
  myHeaders.append("Cookie", "JSESSIONID=863EF35CE0D4CF579E1D3EFDC80AA317");

  var raw = JSON.stringify({
    title: item.title,
    description: item.summary,
    imageUrl: item.image,
  });
  console.log(raw);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:8080/api/recipe", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const Popular = () => {
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
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=${numberOfRecipes}&tags=${tags}`
      )
        .then((response) => response.json())
        .then((data, i) => {
          console.log(data, i);
          setPopular(data["recipes"]);
          console.log("Popular:", popular);
          localStorage.setItem(storageVal, JSON.stringify(data.recipes));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return (
    <div>
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
          console.log("Being Called with: ", item["title"]);
          return (
            <SplideSlide key={item.id}>
              <div>
                <RecipeCard item={itemSet} key={item["id"]}></RecipeCard>
                <Button
                  sx={{
                    marginLeft: "0.7em",
                  }}
                  onClick={() => saveData(itemSet)}
                  startIcon={<SaveAlt />}
                >
                  Save
                </Button>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
      {/* <Splide
        tag="section"
        options={{
          perPage: 4,
          drag: "free",
          arrows: true,
          pagination: true,
          padding: "3rem",
          gap: "5rem",
        }}
      >
        <SplideTrack>
          {popular.map((item) => {
            const itemSet = {
              title: item["title"],
              image: item["image"],
              summary: item["summary"],
            };
            console.log("Being Called with: ", item["title"]);
            return (
              <div key={item.id}>
                <RecipeCard item={itemSet} key={item["id"]}></RecipeCard>
                <Button
                  sx={{
                    marginLeft: "0.7em",
                  }}
                  onClick={() => saveData(itemSet)}
                  startIcon={<SaveAlt />}
                >
                  Save
                </Button>
              </div>
            );
          })}
        </SplideTrack>
      </Splide> */}
    </div>
  );
};

export default Popular;

/* <Card
                  key={item.key}
                  sx={{
                    width: 345,
                    height: 350,
                    overflow: "hidden",
                    margin: "2px 8px",
                  }}
                >
                  <CardMedia
                    sx={{ height: 140, p: "2px" }}
                    image={item["image"]}
                    title={"Photo: " + item["title"]}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {item["title"]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item["summary"]}
                    </Typography>
                  </CardContent>
                </Card> */
