import React from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import { useUser } from '../../globalData/UserContext'; // Adjust the import path if needed
import './Home.css'; // Optional: Create this file for custom styles

const Home: React.FC = () => {
  const { loggedInUser } = useUser(); // Get the logged-in user from context
  const navigate = useNavigate(); // Use useNavigate to handle navigation

  const handleManageRentalsClick = () => {
    if (loggedInUser) {
      navigate("/rentals"); // Navigate to rentals page if logged in
    } else {
      navigate("/login"); // Redirect to login page if not logged in
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Library Management System</h1>
      <p>
        This application helps you explore a catalog of books, manage your rentals, and track your active and past rentals.
      </p>
      <div className="home-buttons">
        <button className="nav-button" onClick={() => navigate("/catalog")}>
          View Book Catalog
        </button>
        <button className="nav-button" onClick={handleManageRentalsClick}>
          Manage Rentals
        </button>
      </div>
    </div>
  );
};

export default Home;
