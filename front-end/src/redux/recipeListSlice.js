import { createSlice } from "@reduxjs/toolkit";

export const recipeListSlice = createSlice({
  name: "recipeCollection",
  initialState: {
    recipeList: [],
  },
  reducers: {
    addRecipe: (state, newRecipe) => {
        console.log("Called into reducer... Type is: ", typeof(state.recipeList))
      state.recipeList.push(newRecipe.payload);
    },
    removeRecipe: (state, removedRecipe) => {
      var index = state.recipeList.findIndex(item=>item.title === removedRecipe.payload.title)
      console.log("Index: ", index, " Val: ", state.recipeList[index])
      if (index > -1) {
        state.recipeList.splice(index, 1);
      }
    },
    setRecipeList: (state, newRecipeList) => {
        state.recipeList = newRecipeList.payload
    },
  },
});

export const { addRecipe, removeRecipe, setRecipeList } = recipeListSlice.actions

export default recipeListSlice.reducer