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

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User updateUserProfile(String email, User updatedProfile) {
        User user = findUserByEmail(email);
        if (user == null) {
            return null;
        }

        user.setFirstName(updatedProfile.getFirstName());
        user.setLastName(updatedProfile.getLastName());
        user.setEmail(updatedProfile.getEmail());

        return userRepository.save(user);
    }

    @Override
    public User changePassword(String email, String currentPassword, String newPassword, String confirmPassword) {
        // Check if the new password matches the confirm password
        if (!newPassword.equals(confirmPassword)) {
            throw new IllegalArgumentException("Passwords do not match.");
        }

        // Fetch the user by email
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("User not found.");
        }

        // Check if the current password matches the stored password
        if (!currentPassword.equals(user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect.");
        }

        // Ensure new password is not empty or null
        if (newPassword == null || newPassword.isEmpty()) {
            throw new IllegalArgumentException("New password is invalid.");
        }

        user.setPassword(newPassword);

        return userRepository.save(user);
    }
}
