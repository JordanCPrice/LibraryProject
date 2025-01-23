import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./cardstyles.css";
import Modal from "./modal";

interface Book {
  bookId: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  availableCopies: number;
}

function BookCards() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [modalVisible, setModalVisible] = useState<boolean>(false);  // Confirmation modal state
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [refreshBooks, setRefreshBooks] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message state

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:7777/books")
      .then((response) => {
        const mappedBooks = response.data.map((book: any) => ({
          ...book,
          bookId: book.id,
        }));
        setBooks(mappedBooks);
      })
      .catch((error) => {
        console.error("There was an error fetching the books!", error);
      });
  }, [refreshBooks]);

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

  const handleRent = (book: Book) => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      setErrorMessage("You must be logged in to rent a book!");
      setTimeout(() => {
        setErrorMessage(null); // Clear error message after 3 seconds
        navigate("/login"); // Redirect to the login page after 3 seconds
      }, 3000); // 3 seconds delay
      return;
    }

    // If logged in, proceed with rent process (no need for confirmation modal)
    setSelectedBook(book);
    setModalVisible(true); // Only show confirmation modal if the user is logged in
  };

  const handleConfirmRent = () => {
    if (selectedBook) {
      const loggedInUser = localStorage.getItem("loggedInUser");
      const user = loggedInUser ? JSON.parse(loggedInUser) : null;

      if (user) {
        const rentalRequest = {
          userId: user.id,
          bookId: selectedBook.bookId,
        };

        axios
          .post("http://localhost:7777/create", rentalRequest)
          .then((response) => {
            console.log("Rental created successfully:", response.data);
            setModalVisible(false);
            setSelectedBook(null);
            setRefreshBooks((prev) => !prev);
            navigate("/rentals");
          })
          .catch((error) => {
            console.error("Error creating rental:", error);
          });
      }
    }
  };

  const handleCancelRent = () => {
    setModalVisible(false);
    setSelectedBook(null);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
          placeholder="Search books by title, author, or description..."
        />
      </div>

      {/* Display the error message if there is one */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

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
                <button
                  className={`rent-button ${book.availableCopies === 0 ? "rent-button-disabled" : ""}`}
                  disabled={book.availableCopies === 0}
                  onClick={() => handleRent(book)}
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

      {/* Confirmation Modal */}
      {modalVisible && selectedBook && (
        <Modal
          message={`Are you sure you want to rent "${selectedBook.title}" by ${selectedBook.author}?`}
          onConfirm={handleConfirmRent}
          onCancel={handleCancelRent}
        />
      )}
    </div>
  );
}

export default BookCards;
