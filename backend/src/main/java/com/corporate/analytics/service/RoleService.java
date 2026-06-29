package com.corporate.analytics.service;
import java.util.List;
import com.corporate.analytics.dto.request.CreateRoleRequest;
import com.corporate.analytics.dto.response.RoleResponseDTO;
import com.corporate.analytics.dto.request.UpdateRoleRequest;
public interface RoleService {

    List<RoleResponseDTO> getAllRoles();
    RoleResponseDTO createRole(CreateRoleRequest request);
    RoleResponseDTO getRoleById(Integer id);
    RoleResponseDTO updateRole(Integer id, UpdateRoleRequest request);
    void deleteRole(Integer id);
}