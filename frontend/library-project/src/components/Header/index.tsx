import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/library-book-image.png";
import BasicMenu from "./ProfileMenu";
import { FaHome } from "react-icons/fa"; // Import a home icon from react-icons
import "./styles.css";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleDonateButtonClick = () => {
    navigate("/donate"); // Navigate to the donation page
  };

  const handleHomeClick = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={logo} alt="library-book-image" className="navbar-logo" />
        <span className="navbar-text">Jordan's Library</span>
      </div>
      <div className="center-container">
        <button className="header-button" onClick={handleDonateButtonClick}>
          Have a book you'd like to donate? Click here!
        </button>
      </div>
      <div className="profile-container">
        {/* Home Icon */}
        <FaHome className="home-icon" onClick={handleHomeClick} />
        <BasicMenu />
      </div>
    </div>
  );
};

export default Header;
