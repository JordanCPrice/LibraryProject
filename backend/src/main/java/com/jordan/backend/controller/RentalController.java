package com.jordan.backend.controller;

import com.jordan.backend.dto.RentalDTO;
import com.jordan.backend.dto.RentalRequestDTO;
import com.jordan.backend.model.Rental;
import com.jordan.backend.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin

public class RentalController {

    private final RentalService rentalService;

    @Autowired
    public RentalController(RentalService rentalService) {
        this.rentalService = rentalService;
    }

    @PostMapping("/create")
    public ResponseEntity<Rental> createRental(@RequestBody RentalRequestDTO rentalRequestDTO){
        Rental rental = rentalService.createRental(rentalRequestDTO.getUserId(), rentalRequestDTO.getBookId());
        return ResponseEntity.status(201).body(rental);
    }

    @PutMapping("/return/{rentalId}")
    public ResponseEntity<Rental> returnBook(@PathVariable String rentalId) {
        Rental returnedRental = rentalService.returnBook(rentalId);
        return ResponseEntity.ok(returnedRental);
    }

    @GetMapping("/rentals/user/{userId}")
    public ResponseEntity<List<RentalDTO>> getRentalsByUser(@PathVariable String userId) {
        List<RentalDTO> rentals = rentalService.getRentalsByUserId(userId);
        return ResponseEntity.ok(rentals);
    }

}
