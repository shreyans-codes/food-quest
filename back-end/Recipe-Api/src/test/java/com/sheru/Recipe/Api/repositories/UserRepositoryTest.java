package com.sheru.Recipe.Api.repositories;

import com.sheru.Recipe.Api.Model.User;
import com.sheru.Recipe.Api.Respository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase (connection = EmbeddedDatabaseConnection.H2)
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    @Test

     {

        //Arrange
        User shreyans = User.builder()
                .firstName("Shreyans")
                .lastName("Sethia")
                .email("shreyans@gmail.com")
                .password("1234")
                .username("shreyans")
                .mfaEnabled(false).build();

        //Act
        User savedUser = userRepository.save(shreyans);

        //Assert
        Assertions.assertThat(savedUser).isNotNull();
        Assertions.assertThat(savedUser.getUserId()).isGreaterThan(0);
    }

    @Test
    public void UserRepository_GetAll_ReturnSavedUsers() {

        //Arrange
        User u1 = User.builder()
                .firstName("Shreyans")
                .lastName("Sethia")
                .email("shreyans@gmail.com")
                .password("1234")
                .username("shreyans")
                .mfaEnabled(false).build();

        User u2 = User.builder()
                .firstName("Shruti ")
                .lastName("Sethia")
                .email("shruti@gmail.com")
                .password("1234")
                .username("shruti")
                .mfaEnabled(false).build();


        //Act
        userRepository.save(u1);
        userRepository.save(u2);

        List<User> userList = userRepository.findAll();

        //Assert
        Assertions.assertThat(userList).isNotNull();
        Assertions.assertThat(userList.size()).isEqualTo(2);
    }

    @Test
    public void UserRepository_FindByUsername_ReturnSavedUser() {

        //Arrange
        User shreyans = User.builder()
                .firstName("Shreyans")
                .lastName("Sethia")
                .email("shreyans@gmail.com")
                .password("1234")
                .username("shreyans")
                .mfaEnabled(false).build();

        //Act
        userRepository.save(shreyans);
        User savedUser = userRepository.findByUsername(shreyans.getUsername()).get();

        //Assert
        Assertions.assertThat(savedUser).isNotNull();
    }

    @Test
    public void UserRepository_UpdateUser_ReturnSavedUser() {

        //Arrange
        User shreyans = User.builder()
                .firstName("Shreyans")
                .lastName("Sethia")
                .email("shreyans@gmail.com")
                .password("1234")
                .username("shreyans")
                .mfaEnabled(false).build();

        //Act
        userRepository.save(shreyans);
        User savedUser = userRepository.findByUsername(shreyans.getUsername()).get();
        String newEmail = "shreyans1@gmail.com";
        String newName = "Shreyans 1";
        savedUser.setEmail(newEmail);
        savedUser.setFirstName(newName);
        User updatedUser = userRepository.save(savedUser);

        //Assert
        Assertions.assertThat(updatedUser).isNotNull();
        Assertions.assertThat(updatedUser.getEmail()).isEqualTo(newEmail);
        Assertions.assertThat(updatedUser.getFirstName()).isEqualTo(newName);
        Assertions.assertThat(updatedUser.getUsername()).isEqualTo(savedUser.getUsername());
    }

    @Test
    public void UserRepository_DeleteUser_ReturnUserIsEmpty() {

        //Arrange
        User shreyans = User.builder()
                .firstName("Shreyans")
                .lastName("Sethia")
                .email("shreyans@gmail.com")
                .password("1234")
                .username("shreyans")
                .mfaEnabled(false).build();

        //Act
        userRepository.save(shreyans);
        userRepository.deleteById(shreyans.getUserId());
        // Finding the user
        Optional<User> savedUser = userRepository.findById(shreyans.getUserId());

        //Assert
        Assertions.assertThat(savedUser).isEmpty();
    }

    @Test
    public void UserRepository_DeleteUserByUsername_ReturnUserIsEmpty() {

        //Arrange
        User shreyans = User.builder()
                .firstName("Shreyans")
                .lastName("Sethia")
                .email("shreyans@gmail.com")
                .password("1234")
                .username("shreyans")
                .mfaEnabled(false).build();

        //Act
        userRepository.save(shreyans);
        userRepository.deleteById(userRepository.findByUsername(shreyans.getUsername()).get().getUserId());
        // Finding the user
        Optional<User> savedUser = userRepository.findByUsername(shreyans.getUsername());

        //Assert
        Assertions.assertThat(savedUser).isEmpty();
    }
}
