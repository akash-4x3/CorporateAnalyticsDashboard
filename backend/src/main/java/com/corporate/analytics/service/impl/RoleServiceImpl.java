package com.corporate.analytics.service.impl;

import com.corporate.analytics.dto.request.CreateRoleRequest;
import com.corporate.analytics.entity.Role;
import com.corporate.analytics.repository.RoleRepository;
import com.corporate.analytics.service.RoleService;
import org.springframework.stereotype.Service;
import com.corporate.analytics.dto.response.RoleResponseDTO;
import com.corporate.analytics.mapper.RoleMapper;
import com.corporate.analytics.exception.ResourceNotFoundException;
import com.corporate.analytics.dto.request.UpdateRoleRequest;
import com.corporate.analytics.exception.DuplicateResourceException;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<RoleResponseDTO> getAllRoles() {

        return roleRepository.findAll()
                .stream()
                .map(RoleMapper::toDTO)
                .toList();
    }

    @Override
    public RoleResponseDTO getRoleById(Integer id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + id));
        return RoleMapper.toDTO(role);
    }

    @Override
    public RoleResponseDTO createRole(CreateRoleRequest request) {
        Role role = RoleMapper.toEntity(request);
        role = roleRepository.save(role);
        return RoleMapper.toDTO(role);
    }
    @Override
    public RoleResponseDTO updateRole(Integer id, UpdateRoleRequest request) {

        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        if (!role.getRoleName().equals(request.getRoleName())
                && roleRepository.existsByRoleName(request.getRoleName())) {

            throw new DuplicateResourceException("Role already exists");
        }

        role.setRoleName(request.getRoleName());

        Role updatedRole = roleRepository.save(role);

        return RoleMapper.toDTO(updatedRole);
    }
    @Override
    public void deleteRole(Integer id) {

        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        roleRepository.delete(role);
    }
}