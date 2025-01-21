package com.jordan.backend.controller;

import com.jordan.backend.dto.LoginDTO;
import com.jordan.backend.dto.OutgoingUserDTO;
import com.jordan.backend.service.AuthService;
import com.jordan.backend.service.implementations.AuthServiceImpl;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {

    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService){
        this.authService = authService;
    }

    //uninitialized HttpSession (fills upon successful login)
    public static HttpSession session;

    //HTTP session is coming in via parameters
    // The session in the parameters is not the same as the static session above
    @PostMapping
    public ResponseEntity<OutgoingUserDTO> login(@RequestBody LoginDTO lDTO, HttpSession session){

        // Send loginDTO to service, getting us an outuser
        OutgoingUserDTO uDTO = authService.login(lDTO, session);

        // The session get initialized and filled with user data in the service layer

        // if we get here, login was successful and session was created
        return ResponseEntity.ok(uDTO);
    }

    //Exception Handler for IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException e) {
        //Return a 400 (BAD REQUEST) status code with the exception message
        return ResponseEntity.status(400).body(e.getMessage());
    }
}
