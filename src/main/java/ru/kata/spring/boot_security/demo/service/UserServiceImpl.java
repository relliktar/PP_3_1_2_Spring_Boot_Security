package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.dao.RoleDao;
import ru.kata.spring.boot_security.demo.dao.UserDao;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
class UserServiceImpl implements UserService {
    private UserDao userDao;
    private RoleDao roleDao;

    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Autowired
    public void setRoleDao(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @Override
    public List<User> getUsersList() {
        return userDao.getUsers();
    }

    @Override
    public void saveUser(User user, String[] selected) {
        Set<Role> roles = new HashSet<>();
        Arrays.stream(selected).forEach(role -> roles.add(roleDao.findByName(role)));
        user.setRoles(roles);
        userDao.saveUser(user);
    }

    @Override
    public User findByName(String name) {
        return userDao.findByUsername(name);
    }

    @Override
    public User findById(Long id) {
        return userDao.findById(id);
    }

    @Override
    public void deleteUser(Long id) {
        userDao.deleteUser(id);
    }
}
