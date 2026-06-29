package com.corporate.analytics.controller;

import com.corporate.analytics.dto.request.LoginRequest;
import com.corporate.analytics.dto.response.LoginResponse;
import com.corporate.analytics.payload.ApiResponse;
import com.corporate.analytics.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return new ApiResponse<>(
                true,
                "Login successful",
                authService.login(request)
        );
    }
} 