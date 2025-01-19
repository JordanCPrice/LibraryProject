package com.jordan.backend.service;

import com.jordan.backend.model.Book;
import com.jordan.backend.model.Rental;
import com.jordan.backend.model.User;

public interface RentalService {

    public Rental createRental(String userId, String bookId);

    Rental getRentalByUserAndBook(User user, Book book);

    Rental saveRental(Rental rental);

    Rental returnBook(String rentalId);

    Rental processReturn(Rental rental);
}
