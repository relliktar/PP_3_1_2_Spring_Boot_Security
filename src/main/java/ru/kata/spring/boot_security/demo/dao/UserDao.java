package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserDao {
    List<User> getUsers();

    void saveUser(User user);

    void deleteUser(Long id);

    User findById(Long id);

    User findByUsername(String username);

    User findByEmail(String email);
}
