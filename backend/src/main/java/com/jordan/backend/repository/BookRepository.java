package com.jordan.backend.repository;

import com.jordan.backend.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends MongoRepository<Book, String> {

    List<Book> findByTitle(String title);

    List<Book> findByAuthor(String author);

    Book findByisbn(String isbn);

    // Custom query to find books by a keyword in their description (case-insensitive search)
    @Query("{ 'description' : { $regex: ?0, $options: 'i' } }")
    List<Book> findByDescriptionContainingIgnoreCase(String keyword);

    List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String author, String description);

}
