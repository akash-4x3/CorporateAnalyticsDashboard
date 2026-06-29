package com.corporate.analytics.service.impl;

import com.corporate.analytics.entity.Department;
import com.corporate.analytics.repository.DepartmentRepository;
import com.corporate.analytics.service.DepartmentService;
import org.springframework.stereotype.Service;
import com.corporate.analytics.dto.request.CreateDepartmentRequest;
import com.corporate.analytics.dto.response.DepartmentResponseDTO;
import com.corporate.analytics.exception.DuplicateResourceException;
import com.corporate.analytics.exception.ResourceNotFoundException;
import com.corporate.analytics.mapper.DepartmentMapper;
import com.corporate.analytics.dto.request.UpdateDepartmentRequest;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public List<DepartmentResponseDTO> getAllDepartments() {
        return departmentRepository.findAll()
                .stream()
                .map(DepartmentMapper::toDTO)
                .toList();
    }
    @Override
    public DepartmentResponseDTO createDepartment(CreateDepartmentRequest request) {
        System.out.println("Incoming department: " + request.getDepartmentName());
        System.out.println("Exists: " + departmentRepository.existsByDepartmentName(request.getDepartmentName()));

        if (departmentRepository.existsByDepartmentName(request.getDepartmentName())) {
            throw new DuplicateResourceException("Department already exists");
        }

        Department department = new Department();

        department.setDepartmentName(request.getDepartmentName());

        Department savedDepartment = departmentRepository.save(department);

        return DepartmentMapper.toDTO(savedDepartment);
    }
    @Override
    public DepartmentResponseDTO getDepartmentById(Integer id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));

        return DepartmentMapper.toDTO(department);
    }
    @Override
    public DepartmentResponseDTO updateDepartment(Integer id, UpdateDepartmentRequest request) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));

        if (!department.getDepartmentName().equals(request.getDepartmentName())
                && departmentRepository.existsByDepartmentName(request.getDepartmentName())) {

            throw new DuplicateResourceException("Department already exists");
        }

        department.setDepartmentName(request.getDepartmentName());

        Department updatedDepartment = departmentRepository.save(department);

        return DepartmentMapper.toDTO(updatedDepartment);
    }
    @Override
    public void deleteDepartment(Integer id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));

        departmentRepository.delete(department);
    }
}