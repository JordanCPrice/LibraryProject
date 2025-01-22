package com.jordan.backend.controller;

import com.jordan.backend.dto.RentalDTO;
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
    public ResponseEntity<Rental> createRental(@RequestParam String userId, @RequestParam String bookId){
        Rental rental = rentalService.createRental(userId, bookId);
        return ResponseEntity.status(201).body(rental);
    }

    @PostMapping("/return")
    public ResponseEntity<Rental> returnBook(@RequestParam String rentalId) {
        Rental returnedRental = rentalService.returnBook(rentalId);
        return ResponseEntity.ok(returnedRental);
    }

    @GetMapping("/rentals/user/{userId}")
    public ResponseEntity<List<RentalDTO>> getRentalsByUser(@PathVariable String userId) {
        List<RentalDTO> rentals = rentalService.getRentalsByUserId(userId);
        return ResponseEntity.ok(rentals);
    }

}
