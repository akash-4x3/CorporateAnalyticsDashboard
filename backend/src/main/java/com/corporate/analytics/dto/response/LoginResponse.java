package com.corporate.analytics.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {

    private String token;

    private String tokenType;

    private Integer userId;

    private String fullName;

    private String email;

    private String role;

}