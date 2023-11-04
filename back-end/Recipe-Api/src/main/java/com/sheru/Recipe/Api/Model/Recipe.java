package com.sheru.Recipe.Api.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class Recipe {
    @Id
    @GeneratedValue
    private Long recipeId;
    @Column(length = 1000)
    private String title;
    @Column(length = 3000)
    private String description;

    @Column(length = 3000)
    private String imageUrl;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    }, fetch = FetchType.EAGER)
    private List<FoodItem> foodItemList = new ArrayList<>();

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    }, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<User> userSaved = new ArrayList<>();

    public Recipe(String title, String description, List<FoodItem> foodItemList) {
        this.title = title;
        this.description = description;
        this.foodItemList = foodItemList;
    }

    public Recipe(String title, String description, String imageUrl, List<FoodItem> foodItemList) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        System.out.println(imageUrl);
        this.foodItemList = foodItemList;
    }

    public Recipe() {

    }

    public Long getId() {
        return recipeId;
    }

    public void setId(Long id) {
        this.recipeId = id;
    }

    public String getTitle() {
        return title;
    }

//    @JsonIgnore
    public List<FoodItem> getFoodItemList() {
        return foodItemList;
    }

    public void setTitle(String name) {
        this.title = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setFoodItemList(List<FoodItem> foodItemList) {
        this.foodItemList = foodItemList;
    }

    @Override
    public String toString() {
        List<String> ingredients = new ArrayList<>();
        foodItemList.forEach((item) -> ingredients.add(item.getName()));
        System.out.println(ingredients);
        return "Recipe{" +
                "recipeId=" + recipeId +
                ", name='" + title + '\'' +
                ", description='" + description + '\'' +
                ", foodItemList=" + ingredients +
                '}';
    }
}
