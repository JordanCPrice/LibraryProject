package com.jordan.backend.service;

import com.jordan.backend.dto.RentalDTO;
import com.jordan.backend.model.Book;
import com.jordan.backend.model.Rental;
import com.jordan.backend.model.User;

import java.util.List;

public interface RentalService {

    Rental createRental(String userId, String bookId);

    Rental getRentalByUserAndBook(User user, Book book);

    Rental saveRental(Rental rental);

    Rental returnBook(String rentalId);

    Rental processReturn(Rental rental);

    List<RentalDTO> getRentalsByUserId(String userId);
}
