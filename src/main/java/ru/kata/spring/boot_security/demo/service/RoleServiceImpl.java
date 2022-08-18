package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.model.Role;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService {
    private RoleRepository roleRepository;
    private List<Role> roles;

    @Autowired
    public void setRoleRepository(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<Role> getAllRoles() {
        if (roles == null) {
            roles = roleRepository.findAll();
        }
        return roles;
    }

    public Set<Role> getSetRoles(Long[] roleId) {
        Set<Role> roles = new HashSet<>();
        List<Role> allRoles = getAllRoles();
        allRoles.forEach(role -> {
            if (Arrays.asList(roleId).contains(role.getId())) {
                roles.add(role);
            }
        });
        return roles;
    }
}
