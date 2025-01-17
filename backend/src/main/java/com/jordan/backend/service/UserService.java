package com.jordan.backend.service;

import com.jordan.backend.model.User;

public interface UserService {

    User getById(String userId);

    User register(User newUser);

}
