package com.jordan.backend.service.implementations;

import com.jordan.backend.dto.BookRequestDTO;
import com.jordan.backend.dto.BookResponseDTO;
import com.jordan.backend.model.Book;
import com.jordan.backend.model.Rental;
import com.jordan.backend.model.User;
import com.jordan.backend.repository.BookRepository;
import com.jordan.backend.service.BookService;
import com.jordan.backend.service.RentalService;
import com.jordan.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    BookRepository bookRepository;

    @Autowired
    private RentalService rentalService;

    @Autowired
    private UserService userService;

    @Override
    public Book addBook(BookRequestDTO bookRequestDTO) {
        if (bookRequestDTO.getTitle() == null || bookRequestDTO.getTitle().isEmpty()){
            throw new IllegalArgumentException("Book title cannot be empty.");
        }
        Book existingBook = bookRepository.findByisbn(bookRequestDTO.getIsbn());
        if (existingBook != null){
             updateAvailableCopies(existingBook,bookRequestDTO.getTotalCopies());
            return existingBook;
        }

        Book book = new Book();
        book.setTitle(bookRequestDTO.getTitle());
        book.setAuthor(bookRequestDTO.getAuthor());
        book.setDescription(bookRequestDTO.getDescription());
        book.setIsbn(bookRequestDTO.getIsbn());
        book.setAvailableCopies(bookRequestDTO.getTotalCopies());
        book.setTotalCopies(bookRequestDTO.getTotalCopies());

        return bookRepository.save(book);
    }

    @Override
    public Book deleteById(String id) {
        Book bookToDelete = bookRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("No book found with id: " + id));

        bookRepository.deleteById(id);

        return bookToDelete;
    }

    @Override
    public List<Book> getByAuthor(String author) {
        return bookRepository.findByAuthor(author);
    }

    @Override
    public List<Book> getByTitle(String title) {
        return bookRepository.findByTitle(title);
    }

    @Override
    public Book getById(String bookId) {
        return bookRepository.findById(bookId).orElseThrow(() ->
                new IllegalArgumentException("Book with ID " + bookId + " not found."));
    }

    @Override
    public Book getByISBN(String isbn) {
        return bookRepository.findByisbn(isbn);
    }

    @Override
    public Book updateAvailableCopies(Book book, int changeInCopies) {
        if (changeInCopies <= 0){
            throw new IllegalArgumentException("Available copies must be greater than 0.");
        }
       int newAvailableCopies = book.getAvailableCopies() + changeInCopies;
       int newTotalCopies = book.getTotalCopies() + changeInCopies;
        book.setAvailableCopies(newAvailableCopies);
        book.setTotalCopies(newTotalCopies);

        return bookRepository.save(book);
    }

    @Override
    public Book rentBook(String bookId, String userId) {
       Book book =  getById(bookId);
       User user = userService.getById(userId);

       if (book.getAvailableCopies() > 0){
           rentalService.createRental(user.getId(),book.getId());

           book.setAvailableCopies(book.getAvailableCopies() - 1);

           return bookRepository.save(book);
       }else{
           throw new IllegalArgumentException("Book is not available for rent.");
       }
    }

    @Override
    public Book returnBook(String bookId, String userId) {
        Book book = getById(bookId);
        User user = userService.getById(userId);
        Rental rental = rentalService.getRentalByUserAndBook(user, book);

        Rental updatedRental = rentalService.processReturn(rental);

        return updatedRental.getBook();
    }


    @Override
    public List<Book> searchByDescription(String keyword) {
        return bookRepository.findByDescriptionContainingIgnoreCase(keyword);
    }

    @Override
    public List<BookResponseDTO> findAvailableBooks() {
        List<Book> books = bookRepository.findAll();

        return books.stream()
                .filter(book-> book.getAvailableCopies() > 0)
                .map(book -> new BookResponseDTO(
                        book.getTitle(),
                        book.getAuthor(),
                        book.getDescription(),
                        book.getIsbn(),
                        book.getAvailableCopies()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<BookResponseDTO> getAllBooks() {
        List<Book> books = bookRepository.findAll();

        return books.stream()
                .map(book -> new BookResponseDTO(
                        book.getTitle(),
                        book.getAuthor(),
                        book.getDescription(),
                        book.getIsbn(),
                        book.getAvailableCopies()
                ))
                .collect(Collectors.toList());
    }
    @Override
    public List<Book> getBooks(String query){
        if (query != null && !query.isEmpty()) {
            return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query, query);
        } else {
            return bookRepository.findAll(); // Return all books if no search query is provided
        }
    }

}
