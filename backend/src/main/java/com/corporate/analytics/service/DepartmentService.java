package com.corporate.analytics.service;

import com.corporate.analytics.entity.Department;
import com.corporate.analytics.dto.request.CreateDepartmentRequest;
import com.corporate.analytics.dto.response.DepartmentResponseDTO;
import com.corporate.analytics.dto.request.UpdateDepartmentRequest;
import java.util.List;

public interface DepartmentService {

    List<Department> getAllDepartments();
    DepartmentResponseDTO createDepartment(CreateDepartmentRequest request);
    DepartmentResponseDTO getDepartmentById(Integer id);
    DepartmentResponseDTO updateDepartment(Integer id, UpdateDepartmentRequest request);
    void deleteDepartment(Integer id);
}