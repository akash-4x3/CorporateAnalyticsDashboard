package com.corporate.analytics.repository;

import com.corporate.analytics.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    boolean existsByRoleName(String roleName);
}