import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import myHeaders from "../variables/myHeaders";
import { useDispatch, useSelector } from "react-redux";
import { removeRecipe, setRecipeList } from "../redux/recipeListSlice";

var backendHeaders = myHeaders;
const deleteData = async (id) => {
  var requestOptions = {
    method: "DELETE",
    headers: backendHeaders,
    redirect: "follow",
  };
  var responseCode;
  fetch(`http://localhost:8080/api/recipe/delete/${id}`, requestOptions)
    .then((response) => {
      responseCode = response.status;
      response.text();
    })
    .then((result) => console.log("Result: ", result))
    .catch((error) => console.log("error", error));
  return responseCode;
};

const BackendList = () => {
  const recipeList = useSelector((state) => state.recipeCollection.recipeList);
  const dispatch = useDispatch();
  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/recipe", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setRecipe(result);
        dispatch(setRecipeList(result));
        console.log(result);
        // console.log("New Recipe List: ", recipeList)
      })
      .catch((error) => console.log("ERROR: ", error));
  }, []);

  return (
    <div>
      <article className="prose ml-12">
        <h1>From the database</h1>
      </article>
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
        {recipeList.map((item) => {
          const itemSet = {
            title: item.title,
            image: item.imageUrl,
            summary: item.description,
          };
          console.log("Name: ", item.title);
          return (
            <SplideSlide key={item.id}>
              <RecipeCard
                item={itemSet}
                deleteButton={true}
                onDeleteClick={() => {
                  deleteData(item.id);
                  dispatch(removeRecipe(itemSet));
                  console.log("New Recipe List: ", recipeList);
                }}
              />
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default BackendList;
