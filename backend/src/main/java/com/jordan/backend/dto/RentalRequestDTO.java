package com.jordan.backend.dto;

public class RentalRequestDTO {

    private String userId;

    private String bookId;

    public RentalRequestDTO(String userId, String bookId) {
        this.userId = userId;
        this.bookId = bookId;
    }

    public RentalRequestDTO() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }
}


