package com.corporate.analytics.controller;

import com.corporate.analytics.dto.request.CreateUserRequest;
import com.corporate.analytics.dto.response.UserResponseDTO;
import com.corporate.analytics.payload.ApiResponse;
import com.corporate.analytics.service.UserService;
import org.springframework.web.bind.annotation.*;
import com.corporate.analytics.dto.request.UpdateUserRequest;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ApiResponse<List<UserResponseDTO>> getAllUsers() {

        return new ApiResponse<>(
                true,
                "Users fetched successfully",
                userService.getAllUsers()
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<UserResponseDTO> getUserById(@PathVariable Integer id) {

        return new ApiResponse<>(
                true,
                "User fetched successfully",
                userService.getUserById(id)
        );
    }

    @PostMapping
    public ApiResponse<UserResponseDTO> createUser(
            @RequestBody CreateUserRequest request) {

        UserResponseDTO createdUser = userService.createUser(request);

        return new ApiResponse<>(
                true,
                "User created successfully",
                createdUser
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<UserResponseDTO> updateUser(
            @PathVariable Integer id,
            @RequestBody UpdateUserRequest request) {

        UserResponseDTO updatedUser = userService.updateUser(id, request);

        return new ApiResponse<>(
                true,
                "User updated successfully",
                updatedUser
        );
    }
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteUser(@PathVariable Integer id) {

        userService.deleteUser(id);

        return new ApiResponse<>(
                true,
                "User deleted successfully",
                null
        );
    }
}