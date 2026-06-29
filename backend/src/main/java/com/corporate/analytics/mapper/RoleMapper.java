package com.corporate.analytics.mapper;

import com.corporate.analytics.dto.request.CreateRoleRequest;
import com.corporate.analytics.dto.response.RoleResponseDTO;
import com.corporate.analytics.entity.Role;

public class RoleMapper {

    public static RoleResponseDTO toDTO(Role role) {
        return new RoleResponseDTO(
                role.getRoleId(),
                role.getRoleName()
        );
    }

    public static Role toEntity(CreateRoleRequest request) {

        Role role = new Role();

        role.setRoleName(request.getRoleName());

        return role;
    }
}