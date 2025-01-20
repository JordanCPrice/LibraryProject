import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

function BookCards() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7777/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the books!", error);
      });
  }, []);

  const handleRent = (bookId: string) => {
    console.log(`Renting book with ID: ${bookId}`);
  };

  return (
    <div className="book-cards-container">
      {books.map((book) => {
        // Get the cover image URL from Open Library based on the ISBN
        const imageUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;
        return (
          <div className="card" key={book._id}>
            <img
              src={imageUrl}
              alt={book.title}
              className="card-image"
            />
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
              className="rent-button"
              onClick={() => handleRent(book._id)}
            >
              Rent Book
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default BookCards;
