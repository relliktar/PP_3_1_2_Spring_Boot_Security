package ru.kata.spring.boot_security.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.User;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT user FROM User user JOIN FETCH user.roles WHERE user.email = :email")
    User findUserByEmail(@Param("email")String email);
    User findByUsername(String username);
}
