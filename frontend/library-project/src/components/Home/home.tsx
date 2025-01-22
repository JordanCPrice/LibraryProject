import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../globalData/UserContext';
import './Home.css';

const Home: React.FC = () => {
  const { loggedInUser } = useUser(); // Get the logged-in user from context
  const navigate = useNavigate();

  const handleManageRentalsClick = () => {
    if (loggedInUser) {
      navigate("/rentals");
    } else {
      navigate("/login");
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
