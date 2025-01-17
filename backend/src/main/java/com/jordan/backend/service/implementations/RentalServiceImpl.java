package com.jordan.backend.service.implementations;

import com.jordan.backend.model.Book;
import com.jordan.backend.model.Rental;
import com.jordan.backend.model.User;
import com.jordan.backend.repository.RentalRepository;
import com.jordan.backend.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RentalServiceImpl implements RentalService {

    @Autowired
    private RentalRepository rentalRepository;

    @Override
    public Rental createRental(User user, Book book) {
        Rental rental = new Rental(user, book);
        return rentalRepository.save(rental);
    }

    @Override
    public Rental getRentalByUserAndBook(User user, Book book) {
        return rentalRepository.findByUserIdAndBookId(user.getId(), book.getId());
    }

    @Override
    public Rental saveRental(Rental rental) {
        return rentalRepository.save(rental);
    }
}
