package com.corporate.analytics.service;

import com.corporate.analytics.dto.request.CreateUserRequest;
import com.corporate.analytics.dto.request.UpdateUserRequest;
import com.corporate.analytics.dto.response.UserResponseDTO;

import java.util.List;

public interface UserService {

    List<UserResponseDTO> getAllUsers();

    UserResponseDTO createUser(CreateUserRequest request);
    UserResponseDTO getUserById(Integer id);
    UserResponseDTO updateUser(Integer id, UpdateUserRequest request);
    void deleteUser(Integer id);

}