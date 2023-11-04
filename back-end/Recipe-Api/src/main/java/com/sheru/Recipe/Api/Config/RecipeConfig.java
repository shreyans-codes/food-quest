package com.sheru.Recipe.Api.Config;

import com.sheru.Recipe.Api.Model.FoodItem;
import com.sheru.Recipe.Api.Model.Recipe;
import com.sheru.Recipe.Api.Model.Role;
import com.sheru.Recipe.Api.Model.User;
import com.sheru.Recipe.Api.Respository.RecipeRepository;
import com.sheru.Recipe.Api.Respository.RoleRepository;
import com.sheru.Recipe.Api.Respository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
public class RecipeConfig {
    @Bean
    CommandLineRunner commandLineRunner(RecipeRepository recipeRepository, RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            FoodItem sugar = new FoodItem("Sugar", 200);
            FoodItem choc = new FoodItem("Chocolate", 120);
            FoodItem peanut = new FoodItem("Peanut", 20);

            Recipe r1 = new Recipe(
                    "Brownie Coffins",
                    "Forget going out to eat or ordering takeout every time you crave American food. Try making Brownie Coffins at home. One serving contains 539 calories, 6g of protein, and 33g of fat.",
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
                    List.of(sugar, choc)
            );
            Recipe r2 = new Recipe(
                    "Chocolate Peanut Butter No-Bake Dessert",
                    "The recipe Chocolate Peanut Butter No-Bake Dessert can be made in approximately 45 minutes. This recipe serves 9. One portion of this dish contains around 10g of protein, 35g of fat, and a total of 633 calories.",
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
                    List.of(sugar, peanut)
            );
            sugar.setRecipeList(List.of(r1, r2));
            choc.setRecipeList(List.of(r1));
            peanut.setRecipeList(List.of(r2));
            recipeRepository.saveAll(List.of(r1, r2));

            if(roleRepository.findByAuthority("ADMIN").isPresent()) return;
            Role adminRole = new Role("ADMIN");
            roleRepository.save(adminRole);
            roleRepository.save(new Role("USER"));
            Set<Role> roleSet = new HashSet<>();
            roleSet.add(adminRole);

            User adminUser = new User("admin@thevatika.com", "Admin", "", "admin", passwordEncoder.encode( "admin_password"), List.of(r1), roleSet);
            userRepository.save(adminUser);

        };
    }
}
