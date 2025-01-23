package com.jordan.backend.dto;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class RentalDTO {

    private String rentalId;

    private String userId;

    private String bookId;

    private String bookTitle;

    private String rentalDate;

    private String returnDate;

    public RentalDTO(String rentalId, String userId, String bookId, String bookTitle, String rentalDate, String returnDate) {
        this.rentalId = rentalId;
        this.userId = userId;
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.rentalDate = rentalDate;
        this.returnDate = returnDate;
    }

    public String getRentalId() {
        return rentalId;
    }

    public void setRentalId(String rentalId) {
        this.rentalId = rentalId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public String getRentalDate() {
        return rentalDate;
    }

    public void setRentalDate(String rentalDate) {
        this.rentalDate = rentalDate;
    }

    public String getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(String returnDate) {
        this.returnDate = returnDate;
    }
}
