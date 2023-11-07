package com.sheru.Recipe.Api.repositories;

import com.sheru.Recipe.Api.Model.Role;
import com.sheru.Recipe.Api.Respository.RoleRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class RoleRepositoryTest {
    @Autowired
    private RoleRepository roleRepository;

    @Test
    public void RoleRepository_SaveAll_ReturnSavedRole() {
        // Arrange
        Role role = Role.builder().authority("USER").build();

        // Act
        Role savedRole = roleRepository.save(role);

        // Assert
        Assertions.assertThat(savedRole).isNotNull();
        Assertions.assertThat(savedRole.getRoleId()).isGreaterThan(0);
    }

    @Test
    public void RoleRepository_GetAll_ReturnSavedRole() {
        // Arrange
        Role role = Role.builder().authority("USER").build();
        Role role2 = Role.builder().authority("ADMIN").build();


        // Act
        roleRepository.save(role);
        roleRepository.save(role2);
        List<Role> roleList = roleRepository.findAll();

        // Assert
        Assertions.assertThat(roleList).isNotNull();
        Assertions.assertThat(roleList.size()).isEqualTo(2);
    }

    @Test
    public void RoleRepository_FindByAuthority_ReturnSavedRole() {
        // Arrange
        Role role = Role.builder().authority("USER").build();


        // Act
        roleRepository.save(role);
        Role savedRole = roleRepository.findByAuthority(role.getAuthority()).get();

        // Assert
        Assertions.assertThat(savedRole).isNotNull();
        Assertions.assertThat(savedRole.getRoleId()).isGreaterThan(0);
    }

    @Test
    public void RoleRepository_DeleteRole_ReturnRoleIsEmpty() {
        // Arrange
        Role role = Role.builder().authority("USER").build();

        // Act
        roleRepository.save(role);
        roleRepository.deleteById(role.getRoleId());
        Optional<Role> savedRole = roleRepository.findById(role.getRoleId());

        // Assert
        Assertions.assertThat(savedRole).isEmpty();
    }
}
