package ru.kata.spring.boot_security.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.dao.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;

@Repository
public class RoleDaoImpl implements RoleDao {
    private RoleRepository roleRepository;

    @Autowired
    void setRoleRepository(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name);
    }

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }
}
