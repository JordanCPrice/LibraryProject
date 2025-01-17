package com.jordan.backend.controller;

import com.jordan.backend.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RentalController {

    @Autowired
    RentalService rentalService;
}
