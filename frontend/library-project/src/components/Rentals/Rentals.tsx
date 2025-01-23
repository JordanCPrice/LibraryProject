import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./modal";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./rentals.css";

interface Rental {
  rentalId: string;
  userId: string;
  bookId: string;
  bookTitle: string;
  rentalDate: string;
  returnDate: string | null;
}

const Rentals: React.FC = () => {
  const [activeRentals, setActiveRentals] = useState<Rental[]>([]);
  const [completedRentals, setCompletedRentals] = useState<Rental[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);

  const navigate = useNavigate(); // Initialize useNavigate

  const fetchRentals = async () => {
    try {
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (!loggedInUser) {
        setError("You must be logged in to view your rentals!");
        return;
      }

      const parsedUser = JSON.parse(loggedInUser);
      const userId = parsedUser.id;

      const response = await axios.get<Rental[]>(`http://localhost:7777/rentals/user/${userId}`);
      const rentals = response.data;

      const active = rentals.filter((rental) => rental.returnDate === null);
      const completed = rentals.filter((rental) => rental.returnDate !== null);

      setActiveRentals(active);
      setCompletedRentals(completed);
    } catch (err) {
      setError("Failed to fetch rentals. Please try again later.");
      console.error(err);
    }
  };

  // Fetch rentals on component mount
  useEffect(() => {
    fetchRentals();
  }, []);  // Empty dependency array ensures this runs once on mount

  // Handle date formatting
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle book return confirmation
  const handleReturn = (rental: Rental) => {
    setSelectedRental(rental);
    setModalVisible(true);
  };

  const handleConfirmReturn = async () => {
    if (selectedRental) {
      try {
        const response = await axios.put(`http://localhost:7777/return/${selectedRental.rentalId}`);
        if (response.status === 200) {
          // Update active and completed rentals without needing to manually filter
          fetchRentals();  // Refetch rentals after return
          setModalVisible(false);
          setSelectedRental(null);
        }
      } catch (err) {
        setError("Failed to return the book. Please try again later.");
        console.error(err);
      }
    }
  };

  const handleCancelReturn = () => {
    setModalVisible(false);
    setSelectedRental(null);
  };

  // Navigate back to catalog page
  const handleBackToCatalog = () => {
    navigate("/catalog");  // Adjust the path to your catalog route
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="rentals">
      <h1>My Rentals</h1>

      {/* Button to navigate back to catalog */}
      <button className="back-button" onClick={handleBackToCatalog}>
        Go to Catalog
      </button>

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
                    <button className="return-button" onClick={() => handleReturn(rental)}>Return</button>
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

      {/* Modal for return confirmation */}
      {modalVisible && selectedRental && (
        <Modal
          message={`Are you sure you want to return "${selectedRental.bookTitle}"?`}
          onConfirm={handleConfirmReturn}
          onCancel={handleCancelReturn}
        />
      )}
    </div>
  );
};

export default Rentals;
