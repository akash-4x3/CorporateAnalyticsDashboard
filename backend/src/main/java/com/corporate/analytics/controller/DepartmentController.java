package com.corporate.analytics.controller;

import com.corporate.analytics.entity.Department;
import com.corporate.analytics.exception.ResourceNotFoundException;
import com.corporate.analytics.payload.ApiResponse;
import com.corporate.analytics.service.DepartmentService;
import org.springframework.web.bind.annotation.*;
import com.corporate.analytics.dto.request.CreateDepartmentRequest;
import com.corporate.analytics.dto.response.DepartmentResponseDTO;
import com.corporate.analytics.dto.request.UpdateDepartmentRequest;
import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentService.getAllDepartments();
    }
    @GetMapping("/{id}")
    public ApiResponse<DepartmentResponseDTO> getDepartmentById(@PathVariable Integer id) {

        return new ApiResponse<>(
                true,
                "Department fetched successfully",
                departmentService.getDepartmentById(id)
        );
    }
    @PostMapping
    public ApiResponse<DepartmentResponseDTO> createDepartment(
            @RequestBody CreateDepartmentRequest request) {

        return new ApiResponse<>(
                true,
                "Department created successfully",
                departmentService.createDepartment(request)
        );
    }
    @PutMapping("/{id}")
    public ApiResponse<DepartmentResponseDTO> updateDepartment(
            @PathVariable Integer id,
            @RequestBody UpdateDepartmentRequest request) {

        return new ApiResponse<>(
                true,
                "Department updated successfully",
                departmentService.updateDepartment(id, request)
        );
    }
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteDepartment(@PathVariable Integer id) {

        departmentService.deleteDepartment(id);

        return new ApiResponse<>(
                true,
                "Department deleted successfully",
                null
        );
    }
}