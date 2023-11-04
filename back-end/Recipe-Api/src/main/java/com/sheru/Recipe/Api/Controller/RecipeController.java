package com.sheru.Recipe.Api.Controller;

import com.sheru.Recipe.Api.Model.Recipe;
import com.sheru.Recipe.Api.Service.RecipeService;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/recipe")
@CrossOrigin("*")
public class RecipeController {
    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public Iterable<Recipe> findAllRecipe() {
        return recipeService.findAllRecipe();
    }

    @GetMapping("{id}")
    public Recipe findRecipeById(@PathVariable Long id) {
        return recipeService.findRecipeById(id);
    }

    @PostMapping
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        return recipeService.createNewRecipe(recipe);
    }

    @PutMapping("/update/{recipeId}")
    public Recipe updateRecipe(@PathVariable Long recipeId, @RequestParam(required = false) String name, @RequestParam(required = false) String desc) {
        return recipeService.updateRecipeDetails(recipeId, name, desc);
    }

    @DeleteMapping("/delete/{recipeId}")
    public void deleteRecipe(@PathVariable Long recipeId)
    {
        recipeService.deleteRecipe(recipeId);
    }
}
