package com.corporate.analytics.service.impl;

import com.corporate.analytics.dto.request.LoginRequest;
import com.corporate.analytics.dto.response.LoginResponse;
import com.corporate.analytics.entity.User;
import com.corporate.analytics.exception.ResourceNotFoundException;
import com.corporate.analytics.repository.UserRepository;
import com.corporate.analytics.security.JwtService;
import com.corporate.analytics.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserRepository userRepository,
                           JwtService jwtService,
                           PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResourceNotFoundException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(
                token,
                "Bearer",
                user.getUserId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().getRoleName()
        );
    }
}