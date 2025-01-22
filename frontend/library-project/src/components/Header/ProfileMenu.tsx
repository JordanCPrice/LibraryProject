import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Button from "@mui/material/Button";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useUser } from "../../globalData/UserContext"; // Import the useUser hook
import "./styles.css";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const { loggedInUser, setLoggedInUser } = useUser(); // Get loggedInUser from context
  const navigate = useNavigate(); // React Router hook for navigation

  const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
    handleMenuClose();
  };

  const handleRegisterModalOpen = () => {
    setIsRegisterModalOpen(true);
    handleMenuClose();
  };

  const handleLogout = () => {
    setLoggedInUser({ userId: 0, email: "" }); // Clear user info in context
    localStorage.removeItem("loggedInUser"); // Remove user from localStorage
    navigate("/"); // Navigate to the home page after logout
    handleMenuClose(); // Close the menu
  };

  const handleMyRentals = () => {
    handleMenuClose(); // Close the menu
    navigate("/rentals"); // Navigate to the Rentals page
  };

  return (
    <div>
      <div
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleMenuClick}
        className="profile-menu-flex"
      >
        <MenuRoundedIcon />
        <AccountCircleRoundedIcon />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* Ensure loggedInUser is not null or undefined before accessing email */}
        {loggedInUser && loggedInUser.email ? (
          <>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMyRentals}>My Rentals</MenuItem> {/* Navigate to Rentals */}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleLoginModalOpen}>Login</MenuItem>
            <MenuItem onClick={handleRegisterModalOpen}>Sign Up</MenuItem>
          </>
        )}
      </Menu>

      {/* Modals */}
      <LoginModal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        resetForm={() => {
          setIsLoginModalOpen(false);
        }}
      />

      <RegisterModal
        open={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        resetForm={() => {
          setIsRegisterModalOpen(false);
        }}
      />
    </div>
  );
}
