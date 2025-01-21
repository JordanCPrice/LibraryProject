package com.jordan.backend.service;

import com.jordan.backend.dto.LoginDTO;
import com.jordan.backend.dto.OutgoingUserDTO;
import com.jordan.backend.repository.AuthRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;

public interface AuthService{

    OutgoingUserDTO login(LoginDTO loginDTO, HttpSession session);
}
