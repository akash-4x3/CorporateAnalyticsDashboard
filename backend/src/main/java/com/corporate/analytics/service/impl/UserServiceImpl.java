package com.corporate.analytics.service.impl;

import com.corporate.analytics.dto.request.CreateUserRequest;
import com.corporate.analytics.dto.response.UserResponseDTO;
import com.corporate.analytics.entity.Department;
import com.corporate.analytics.entity.Role;
import com.corporate.analytics.entity.User;
import com.corporate.analytics.exception.DuplicateResourceException;
import com.corporate.analytics.exception.ResourceNotFoundException;
import com.corporate.analytics.mapper.UserMapper;
import com.corporate.analytics.repository.DepartmentRepository;
import com.corporate.analytics.repository.RoleRepository;
import com.corporate.analytics.repository.UserRepository;
import com.corporate.analytics.service.UserService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.corporate.analytics.dto.request.UpdateUserRequest;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           RoleRepository roleRepository,
                           DepartmentRepository departmentRepository,
                           PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.departmentRepository = departmentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(UserMapper::toDTO)
                .toList();
    }

    @Override
    public UserResponseDTO getUserById(Integer id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return UserMapper.toDTO(user);
    }


    @Override
    public UserResponseDTO createUser(CreateUserRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole(role);
        user.setDepartment(department);

        User savedUser = userRepository.save(user);

        return UserMapper.toDTO(savedUser);
    }

    @Override
    public UserResponseDTO updateUser(Integer id, UpdateUserRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (!user.getEmail().equals(request.getEmail())
                && userRepository.existsByEmail(request.getEmail())) {
            
            throw new DuplicateResourceException("Email already exists");
        }

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setRole(role);
        user.setDepartment(department);

        User updatedUser = userRepository.save(user);

        return UserMapper.toDTO(updatedUser);
    }
    @Override
    public void deleteUser(Integer id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        userRepository.delete(user);
    }
}