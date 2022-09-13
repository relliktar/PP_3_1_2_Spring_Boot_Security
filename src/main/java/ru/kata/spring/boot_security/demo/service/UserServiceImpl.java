package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.List;

@Service
class UserServiceImpl implements UserService {
    private final RoleService roleService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    UserServiceImpl(UserRepository userRepository, RoleService roleService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> getUsersList() {
        return userRepository.findAll();
    }

    @Override
    public void updateUser(User user) {
        User userInDatabases = userRepository.findById(user.getId()).orElse(null);
        String password = passwordEncoder.encode(user.getPassword());
        if (userInDatabases != null) {
            if (!userInDatabases.getPassword().equals(user.getPassword())) {
                user.setPassword(password);
            }
        }
        userRepository.save(user);
    }

    @Override
    public void saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
/**
 * убрать возможность дубликатов по почте
 * + починить изменение юзера
 * + удалить лишние контроллеры
 * + поправить секьюрность
 * почитать про н+1
 * + убрать 1 сейв и добавить 1 апдейт
 */