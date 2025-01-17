package com.jordan.backend.service.implementations;

import com.jordan.backend.model.User;
import com.jordan.backend.repository.UserRepository;
import com.jordan.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {



    @Autowired
    private UserRepository userRepository;


    @Override
    public User getById(String userId) {
        return userRepository.findById(userId).orElseThrow(() ->
                new IllegalArgumentException("User not found with id " + userId));
    }

    @Override
    public User register(User newUser){

        if(userRepository.existsByEmail(newUser.getEmail())){
            throw new IllegalArgumentException("Email is already in use.");
        }

        return userRepository.save(newUser);

    }
}
