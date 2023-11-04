package com.sheru.Recipe.Api.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class FoodItem {
    @Id
    @GeneratedValue
    private Long foodId;

    @Column
    private String name;

    @Column
    private int calories;

    @ManyToMany(mappedBy = "foodItemList")
    private List<Recipe> recipeList = new ArrayList<>();

    public FoodItem() {

    }

    public FoodItem(String name, int calories) {
        this.name = name;
        this.calories = calories;
    }

    public FoodItem(Long id, String name, int calories, List<Recipe> recipeList) {
        this.foodId = id;
        this.name = name;
        this.calories = calories;
        this.recipeList = recipeList;
    }
    public Long getFoodId() {
        return foodId;
    }

    public void setFoodId(Long foodId) {
        this.foodId = foodId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    @JsonIgnore
    public List<Recipe> getRecipeList() {
        return recipeList;
    }

    public void setRecipeList(List<Recipe> recipeList) {
        this.recipeList = recipeList;
    }

    @Override
    public String toString() {
        return "FoodItem{" +
                "foodId=" + foodId +
                ", name='" + name + '\'' +
                ", calories=" + calories +
                '}';
    }
}
