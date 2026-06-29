package com.corporate.analytics.service;

import com.corporate.analytics.dto.request.LoginRequest;
import com.corporate.analytics.dto.response.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);

}