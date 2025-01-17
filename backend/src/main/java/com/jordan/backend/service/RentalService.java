package com.jordan.backend.service;

import com.jordan.backend.model.Book;
import com.jordan.backend.model.Rental;
import com.jordan.backend.model.User;

public interface RentalService {

    Rental createRental (User user, Book book);

    Rental getRentalByUserAndBook(User user, Book book);

    Rental saveRental(Rental rental);

}
