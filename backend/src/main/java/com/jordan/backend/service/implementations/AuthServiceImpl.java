package com.jordan.backend.service.implementations;

import com.jordan.backend.controller.AuthController;
import com.jordan.backend.dto.LoginDTO;
import com.jordan.backend.dto.OutgoingUserDTO;
import com.jordan.backend.model.User;
import com.jordan.backend.repository.AuthRepository;
import com.jordan.backend.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private AuthRepository authRepository;

    @Autowired
    public AuthServiceImpl(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }

    @Override
    public OutgoingUserDTO login(LoginDTO loginDTO, HttpSession session) {
        // Fetch the user based on the email
        User user = authRepository.findByEmailAndPassword(loginDTO.getEmail(), loginDTO.getPassword());

        if (user == null) {
            throw new IllegalArgumentException("Invalid credentials.");
        }
        AuthController.session = session;

        // If credentials match, initialize session with user data
        session.setAttribute("userId", user.getId());
        session.setAttribute("FirstName", user.getFirstName());
        session.setAttribute("LastName", user.getLastName());
        session.setAttribute("email", user.getEmail());

        // Return the user data (excluding sensitive info like password)
        return new OutgoingUserDTO(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail());
    }
}
