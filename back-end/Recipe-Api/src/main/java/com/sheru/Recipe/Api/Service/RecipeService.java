package com.sheru.Recipe.Api.Service;

import com.sheru.Recipe.Api.Model.Recipe;
import com.sheru.Recipe.Api.Respository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;


    @Autowired
    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public Recipe createNewRecipe(Recipe recipe) {
        return recipeRepository.findByName(recipe.getTitle()).orElse(recipeRepository.save(recipe));
//        return recipeRepository.save(new Recipe(name, desc));
    }


    public Recipe findRecipeById(Long id) {
        return recipeRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Recipe with id " + id + " not found!"));
    }

    public Iterable<Recipe> findAllRecipe() {
        return recipeRepository.findAll();
    }

    public Long total() {
        return recipeRepository.count();
    }

    public Recipe updateRecipeDetails(Long recipeId, String name, String desc) {
        String errorMessage = "Recipe with id " + recipeId + " not found";
        Recipe current = recipeRepository.findById(recipeId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage));
        if(name!=null && name.length()>0 && name!=current.getTitle())
        {
            current.setTitle(name);
        }
        if(desc!=null && desc.length()>0 && desc!=current.getDescription())
        {
            current.setDescription(desc);
        }
        return current;
    }

    public void deleteRecipe(Long recipeId) {
        recipeRepository.deleteById(recipeId);
    }
}
