package com.jordan.backend.service;

import com.jordan.backend.dto.BookRequestDTO;
import com.jordan.backend.dto.BookResponseDTO;
import com.jordan.backend.model.Book;

import java.util.List;

public interface BookService {


    Book addBook(BookRequestDTO bookRequestDTO);

    Book deleteById(String id);

    List<Book> getByAuthor(String author);

    List<Book> getByTitle(String title);

    Book getById(String bookId);

    Book getByISBN(String isbn);

    Book updateAvailableCopies(Book book, int changeInCopies);

    Book rentBook(String bookId, String userId);

    Book returnBook(String bookId, String userId);

    List<Book> searchByDescription(String keyword);

    List<BookResponseDTO> findAvailableBooks();

    List<BookResponseDTO> getAllBooks();

    List<Book> getBooks(String query);


}
