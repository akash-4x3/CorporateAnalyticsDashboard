package com.corporate.analytics.mapper;

import com.corporate.analytics.dto.response.UserResponseDTO;
import com.corporate.analytics.entity.User;

public class UserMapper {

    public static UserResponseDTO toDTO(User user) {

        return new UserResponseDTO(
                user.getUserId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().getRoleName(),
                user.getDepartment().getDepartmentName()
        );
    }

}