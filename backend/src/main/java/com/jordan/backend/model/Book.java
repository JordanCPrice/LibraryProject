package com.jordan.backend.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Document(collection = "books")
public class Book {

    @Id
    private String id;

    private String title;

    private String author;

    private String description;

    private String isbn;

    private LocalDate additionDate;

    private LocalDate lastRentalDate;

    private int totalCopies;

    private int availableCopies;


    public Book() {
        this.additionDate = LocalDate.now();
        this.lastRentalDate = null;
    }

    public Book(String title, String author, String description, String isbn, int totalCopies) {
        if (totalCopies <= 0) {
            throw new IllegalArgumentException("Total copies must be greater than 0");
        }
        this.title = title;
        this.author = author;
        this.description = description;
        this.isbn = isbn;
        this.additionDate = LocalDate.now();
        this.lastRentalDate = null; // When adding a new book lastRentalDate wont be available
        this.totalCopies = totalCopies;
        this.availableCopies = totalCopies; // As no copies should be rented yet, total and available should be equal
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public LocalDate getAdditionDate() {
        return additionDate;
    }

    public void setAdditionDate(LocalDate additionDate) {
        this.additionDate = additionDate;
    }

    public LocalDate getLastRentalDate() {
        return lastRentalDate;
    }

    public void setLastRentalDate(LocalDate lastRentalDate) {
        this.lastRentalDate = lastRentalDate;
    }

    public int getTotalCopies() {
        return totalCopies;
    }

    public void setTotalCopies(int totalCopies) {
        this.totalCopies = totalCopies;
    }

    public int getAvailableCopies() {
        return availableCopies;
    }

    public void setAvailableCopies(int availableCopies) {
        this.availableCopies = availableCopies;
    }

    @Override
    public String toString() {
        return "Book{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", description='" + description + '\'' +
                ", isbn='" + isbn + '\'' +
                ", additionDate=" + additionDate +
                ", lastRentalDate=" + lastRentalDate +
                ", totalCopies=" + totalCopies +
                ", availableCopies=" + availableCopies +
                '}';
    }
}
