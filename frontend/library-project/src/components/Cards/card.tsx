import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

// Define a type for the Book data structure
interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  availableCopies: number;
}

function BookCards() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    // Fetch book data from the API
    axios
      .get("http://localhost:7777/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the books!", error);
      });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredBooks = books.filter((book) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(lowerCaseQuery) ||
      book.author.toLowerCase().includes(lowerCaseQuery) ||
      book.description.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const handleRent = (bookId: string) => {
    // Implement the logic to handle the rent button click
    console.log(`Renting book with ID: ${bookId}`);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
          placeholder="Search books by title, author, or description..."
        />
      </div>

      {/* Display Filtered Books */}
      <div className="book-cards-container">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => {
            const imageUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;

            return (
              <div className="card" key={book._id}>
                <img src={imageUrl} alt={book.title} className="card-image" />
                <div className="card-content">
                  <h3 className="card-title">{book.title}</h3>
                  <p className="card-author" style={{ fontWeight: "bold" }}>
                    Author: {book.author}
                  </p>
                  <p className="card-description">
                    <span className="label">Description: </span> {book.description}
                  </p>
                  <p className="copies-available">
                    <span className="label">Copies Available: </span> {book.availableCopies}
                  </p>
                </div>
                {/* Rent button */}
                <button
                  className={`rent-button ${
                    book.availableCopies === 0 ? "rent-button-disabled" : ""
                  }`}
                  disabled={book.availableCopies === 0} 
                  onClick={() => handleRent(book._id)}
                >
                  {book.availableCopies === 0 ? "Out of Stock" : "Rent Book"}
                </button>
              </div>
            );
          })
        ) : (
          <p>No books found matching your search criteria.</p>
        )}
      </div>
    </div>
  );
}

export default BookCards;
