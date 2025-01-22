import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Optional: Create this file for custom styles

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Library Management System</h1>
      <p>
        This application helps you explore a catalog of books, manage your rentals, and track your active and past rentals.
      </p>
      <div className="home-buttons">
        <Link to="/catalog">
          <button className="nav-button">View Book Catalog</button>
        </Link>
        <Link to="/rentals">
          <button className="nav-button">Manage Rentals</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
