package com.jordan.backend.dto;

public class BookRequestDTO {

    private String title;

    private String author;

    private String description;

    private String isbn;

    private int totalCopies;

    public BookRequestDTO() {
    }

    public BookRequestDTO(String title, String author, String description, int totalCopies, String isbn) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.isbn = isbn;
        this.totalCopies = totalCopies;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getTotalCopies() {
        return totalCopies;
    }

    public void setTotalCopies(int totalCopies) {
        this.totalCopies = totalCopies;
    }

    @Override
    public String toString() {
        return "BookRequestDTO{" +
                "title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", description='" + description + '\'' +
                ", isbn='" + isbn + '\'' +
                ", totalCopies=" + totalCopies +
                '}';
    }
}
