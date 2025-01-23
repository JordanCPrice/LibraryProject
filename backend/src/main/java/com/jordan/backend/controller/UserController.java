package com.jordan.backend.controller;


import com.jordan.backend.dto.PasswordChangeRequest;
import com.jordan.backend.model.User;
import com.jordan.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/register")
    public ResponseEntity<User> registerUser (@RequestBody User newUser){
        User u = userService.register(newUser);
        return ResponseEntity.status(201).body(u);
    }

    @PutMapping("/users/{email}")
    public ResponseEntity<User> updateUserProfile(@PathVariable String email, @RequestBody User updatedProfile) {
        User updatedUser = userService.updateUserProfile(email, updatedProfile);

        if (updatedUser == null) {
            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/users/{email}/change-password")
    public ResponseEntity<String> changePassword(@PathVariable String email, @RequestBody PasswordChangeRequest passwordChangeRequest) {
        String currentPassword = passwordChangeRequest.getCurrentPassword();
        String newPassword = passwordChangeRequest.getNewPassword();
        String confirmPassword = passwordChangeRequest.getConfirmPassword();

        try {
            // Call the service to change the password
            userService.changePassword(email, currentPassword, newPassword, confirmPassword);
            return ResponseEntity.ok("Password changed successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}
