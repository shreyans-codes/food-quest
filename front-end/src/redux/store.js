import { configureStore } from "@reduxjs/toolkit";
import recipeListReducer from "./recipeListSlice";
import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    recipeCollection: recipeListReducer,
    authActions: authReducer,
  },
});
