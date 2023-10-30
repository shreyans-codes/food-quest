import { configureStore } from "@reduxjs/toolkit";
import recipeListReducer from "./recipeListSlice";

export default configureStore({
  reducer: {
    recipeCollection: recipeListReducer,
  },
});
