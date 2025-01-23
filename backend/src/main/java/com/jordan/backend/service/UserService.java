package com.jordan.backend.service;

import com.jordan.backend.model.User;

public interface UserService {

    User getById(String userId);

    User register(User newUser);

    User findUserByEmail(String email);

    User updateUserProfile(String email, User updatedProfile);

    User changePassword(String email, String currentPassword, String newPassword, String confirmPassword);
}
