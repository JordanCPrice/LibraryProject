package com.jordan.backend.controller;


import com.jordan.backend.model.User;
import com.jordan.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser (@RequestBody User newUser){
        try{
            User u = userService.register(newUser);
            return ResponseEntity.status(201).body(u);

        }catch (IllegalArgumentException e){
            return ResponseEntity.status(400).body(null);
        }
    }
}
