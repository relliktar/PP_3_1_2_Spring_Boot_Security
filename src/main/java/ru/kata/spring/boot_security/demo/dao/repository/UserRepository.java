package ru.kata.spring.boot_security.demo.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.kata.spring.boot_security.demo.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByEmail(String email);
    User findByUsername(String username);
}
