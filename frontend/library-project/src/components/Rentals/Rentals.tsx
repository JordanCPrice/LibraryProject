import React, { useEffect, useState } from "react";
import axios from "axios";
import "./rentals.css";

interface Rental {
  rentalId: string;
  userId: string;
  bookId: string;
  bookTitle: string;
  rentalDate: string; // Backend sends dates as strings
  returnDate: string | null; // Nullable for active rentals
}

const Rentals: React.FC = () => {
  const [activeRentals, setActiveRentals] = useState<Rental[]>([]);
  const [completedRentals, setCompletedRentals] = useState<Rental[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        // Retrieve the 'loggedInUser' object from localStorage
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
          setError("User not logged in.");
          return;
        }

        // Parse the 'loggedInUser' and extract the userId
        const parsedUser = JSON.parse(loggedInUser);
        const userId = parsedUser.id;

        // Fetch rentals data from the backend using the userId
        const response = await axios.get<Rental[]>(`http://localhost:7777/rentals/user/${userId}`);
        const rentals = response.data;

        // Log the rental dates before any manipulation
        rentals.forEach((rental) => {
          console.log(`Rental Date for ${rental.rentalId}:`, rental.rentalDate);
        });

        // Separate active and completed rentals
        const active = rentals.filter((rental) => rental.returnDate === null);
        const completed = rentals.filter((rental) => rental.returnDate !== null);

        setActiveRentals(active);
        setCompletedRentals(completed);
      } catch (err) {
        setError("Failed to fetch rentals. Please try again later.");
        console.error(err);
      }
    };

    fetchRentals();
  }, []);

  // Function to handle date formatting (parse as UTC)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString); // JavaScript can handle 'yyyy-MM-dd' strings directly

    // Adjust the date to UTC before formatting to avoid timezone issues
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Month is 0-based
    const day = String(date.getUTCDate()).padStart(2, "0");
    
    // Format the date to 'YYYY-MM-DD'
    return `${year}-${month}-${day}`;
  };

  // Handle returning a book
  const returnBook = async (rentalId: string) => {
    try {
      const response = await axios.put(`http://localhost:7777/return/${rentalId}`);
      if (response.status === 200) {
        // Update the rental state after successful return
        setActiveRentals(activeRentals.filter((rental) => rental.rentalId !== rentalId));
        setCompletedRentals([
          ...completedRentals,
          {
            ...activeRentals.find((rental) => rental.rentalId === rentalId)!,
            returnDate: new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      setError("Failed to return the book. Please try again later.");
      console.error(err);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="rentals">
      <h1>My Rentals</h1>

      <div className="rentals-section">
        <h2>Active Rentals</h2>
        {activeRentals.length > 0 ? (
          <table className="rentals-table">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Rental Date</th>
                <th>Return Book</th>
              </tr>
            </thead>
            <tbody>
              {activeRentals.map((rental) => (
                <tr key={rental.rentalId}>
                  <td>{rental.bookTitle}</td>
                  <td>{formatDate(rental.rentalDate)}</td>
                  <td>
                    <button className="return-button" onClick={() => returnBook(rental.rentalId)}>Return</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No active rentals.</p>
        )}
      </div>

      <div className="rentals-section">
        <h2>Completed Rentals</h2>
        {completedRentals.length > 0 ? (
          <table className="rentals-table">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Rental Date</th>
                <th>Return Date</th>
              </tr>
            </thead>
            <tbody>
              {completedRentals.map((rental) => (
                <tr key={rental.rentalId}>
                  <td>{rental.bookTitle}</td>
                  <td>{formatDate(rental.rentalDate)}</td>
                  <td>{rental.returnDate ? formatDate(rental.returnDate) : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No completed rentals.</p>
        )}
      </div>
    </div>
  );
};

export default Rentals;
