package com.corporate.analytics.controller;
import com.corporate.analytics.service.RoleService;
import org.springframework.web.bind.annotation.*;
import com.corporate.analytics.dto.request.CreateRoleRequest;
import com.corporate.analytics.dto.response.RoleResponseDTO;
import com.corporate.analytics.payload.ApiResponse;
import com.corporate.analytics.dto.request.UpdateRoleRequest;
import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ApiResponse<List<RoleResponseDTO>> getAllRoles() {

        return new ApiResponse<>(
                true,
                "Roles fetched successfully",
                roleService.getAllRoles()
        );
    }
    @GetMapping("/{id}")
    public ApiResponse<RoleResponseDTO> getRoleById(@PathVariable Integer id) {

        return new ApiResponse<>(
                true,
                "Role fetched successfully",
                roleService.getRoleById(id)
        );
    }

    @PostMapping
    public ApiResponse<RoleResponseDTO> createRole(
            @RequestBody CreateRoleRequest request) {

        return new ApiResponse<>(
                true,
                "Role created successfully",
                roleService.createRole(request)
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<RoleResponseDTO> updateRole(
            @PathVariable Integer id,
            @RequestBody UpdateRoleRequest request) {

        return new ApiResponse<>(
                true,
                "Role updated successfully",
                roleService.updateRole(id, request)
        );
    }
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteRole(@PathVariable Integer id) {

        roleService.deleteRole(id);

        return new ApiResponse<>(
                true,
                "Role deleted successfully",
                null
        );
    }
}
