package com.jordan.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Document(collection = "rentals")
public class Rental {

    @Id
    private String rentalId;

    @DBRef
    private User user;

    @DBRef
    private Book book;

    private String rentalDate;

    private String returnDate;

    public Rental() {
    }

    public Rental(User user, Book book) {
        this.user = user;
        this.book = book;
        this.rentalDate = LocalDate.now().format(DateTimeFormatter.ISO_DATE);
        this.returnDate = null;
    }

    public String getRentalId() {
        return rentalId;
    }

    public void setRentalId(String rentalId) {
        this.rentalId = rentalId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public String getRentalDate() {
        return rentalDate; // Directly return the String
    }

    public void setRentalDate(String rentalDate) {
        this.rentalDate = rentalDate;
    }

    public String getReturnDate() {
        return returnDate; // Directly return the String
    }

    public void setReturnDate(String returnDate) {
        this.returnDate = returnDate;
    }

    @Override
    public String toString() {
        return "Rental{" +
                "rentalId='" + rentalId + '\'' +
                ", user=" + user +
                ", book=" + book +
                ", rentalDate=" + rentalDate +
                ", returnDate=" + returnDate +
                '}';
    }
}
