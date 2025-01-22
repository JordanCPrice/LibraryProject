import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

// Define a type for the Book data structure with `bookId`
interface Book {
  bookId: string;  // Changed from _id to bookId, now using `id` from backend
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
        // Log the response to understand its structure
        console.log("API Response:", response);
        
        // Assuming the API response is an array of books, 
        // and each book contains id as the identifier
        const mappedBooks = response.data.map((book: any) => {
          console.log("Raw Book Data:", book); // Log the raw book data
          
          return {
            ...book,               // Spread all properties
            bookId: book.id,       // Rename id to bookId
          };
        });

        setBooks(mappedBooks); // Set the mapped books to the state
        console.log("Mapped Books:", mappedBooks); // Log the mapped books
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
    // Retrieve the logged-in user info from localStorage
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      console.error("User is not logged in!");
      return; // Prevent renting if no user is logged in
    }

    const user = JSON.parse(loggedInUser);  // Parse the user object
    const loggedInUserId = user.id;  // Extract the user ID

    console.log("User ID:", loggedInUserId);  // Log the user ID to ensure it's correct
    console.log("Book ID:", bookId);  // Log the Book ID to ensure it's passed correctly

    // Proceed to rent the book
    axios
      .post("http://localhost:7777/create", {
        userId: loggedInUserId,
        bookId: bookId, // Pass bookId (which maps to id from the backend)
      })
      .then((response) => {
        console.log("Rental created successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error creating rental:", error);
      });
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
              <div className="card" key={book.bookId}>
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
                  onClick={() => handleRent(book.bookId)} // Use book.bookId here
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
