package com.corporate.analytics.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserRequest {

    private String fullName;

    private String email;

    private String password;

    private Integer roleId;

    private Integer departmentId;
}