package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {
    List<User> getUsersList();

    void deleteUser(Long id);

    void saveUser(User user, Long[] roles);
}
