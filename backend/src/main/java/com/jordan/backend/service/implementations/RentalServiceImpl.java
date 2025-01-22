package com.jordan.backend.service.implementations;

import com.jordan.backend.dto.RentalDTO;
import com.jordan.backend.model.Book;
import com.jordan.backend.model.Rental;
import com.jordan.backend.model.User;
import com.jordan.backend.repository.BookRepository;
import com.jordan.backend.repository.RentalRepository;
import com.jordan.backend.repository.UserRepository;
import com.jordan.backend.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RentalServiceImpl implements RentalService {

    private final RentalRepository rentalRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Autowired
    public RentalServiceImpl(RentalRepository rentalRepository, UserRepository userRepository, BookRepository bookRepository){
        this.rentalRepository = rentalRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public Rental createRental(String userId, String bookId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("No user found with ID: " +userId));
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new IllegalArgumentException("No book found with ID: " +bookId));


        if (book.getAvailableCopies() <= 0){
            throw new IllegalArgumentException("No available copies of the book.");
        }
        Rental rental = new Rental(user,book);
        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepository.save(book);
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

    @Override
    public Rental returnBook(String rentalId) {
        Rental rental = rentalRepository.findById(rentalId).orElseThrow(() -> new IllegalArgumentException("Rental not found with ID: " + rentalId));
        return processReturn(rental);
    }
    @Override
    public Rental processReturn(Rental rental) {
        if (rental == null) {
            throw new IllegalArgumentException("Rental not found.");
        }

        if (rental.getReturnDate() != null) {
            throw new IllegalArgumentException("Book has already been returned.");
        }
        rental.setReturnDate(LocalDate.now().format(DateTimeFormatter.ISO_DATE));

        Book book = bookRepository.findById(rental.getBook().getId()).orElseThrow(() -> new IllegalArgumentException("Book not found."));

        book.setAvailableCopies(book.getAvailableCopies() + 1);
        bookRepository.save(book);

        return rentalRepository.save(rental);

    }

    @Override
    public List<RentalDTO> getRentalsByUserId(String userId) {
        // Validate if user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("No user found with ID: " + userId));

        // Fetch rentals and map to DTOs
        return rentalRepository.findByUserId(userId).stream()
                .map(rental -> new RentalDTO(
                        rental.getRentalId(),
                        rental.getUser().getId(),
                        rental.getBook().getId(),
                        rental.getBook().getTitle(),
                        rental.getRentalDate(),  // Rental date is already a String
                        rental.getReturnDate())) // Return date is already a String
                .collect(Collectors.toList());
    }
}
