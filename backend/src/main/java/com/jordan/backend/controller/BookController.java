package com.jordan.backend.controller;

import com.jordan.backend.dto.BookRequestDTO;
import com.jordan.backend.dto.BookResponseDTO;
import com.jordan.backend.model.Book;
import com.jordan.backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody BookRequestDTO bookRequestDTO){
        Book book = bookService.addBook(bookRequestDTO);
        return ResponseEntity.status(200).body(book);
    }

    @GetMapping
    public ResponseEntity<List<BookResponseDTO>> getAllBooks(){
        return ResponseEntity.ok(bookService.getAllBooks());
    }
}
