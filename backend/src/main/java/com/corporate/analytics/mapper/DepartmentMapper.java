package com.corporate.analytics.mapper;

import com.corporate.analytics.dto.response.DepartmentResponseDTO;
import com.corporate.analytics.entity.Department;


public class DepartmentMapper {
    public static DepartmentResponseDTO toDTO(Department department) {
        return new DepartmentResponseDTO(
                department.getDepartmentId(),
                department.getDepartmentName()
        );
    } 
}
