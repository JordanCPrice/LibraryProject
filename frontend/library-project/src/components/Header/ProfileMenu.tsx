import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Button from "@mui/material/Button";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useUser } from "../../globalData/UserContext";
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
    handleMenuClose();
    setIsLoginModalOpen(false); // Close the login modal
  };

  const handleMyRentals = () => {
    handleMenuClose();
    navigate("/rentals");
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate("/profile");
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
        <MenuRoundedIcon className="menu-icon" />
        <AccountCircleRoundedIcon className="account-icon" />
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
        {loggedInUser && loggedInUser.email ? (
          <>
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleMyRentals}>My Rentals</MenuItem>
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
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />

      <RegisterModal
        open={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
        onRegistrationSuccess={() => {
          // Open login modal after successful registration
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </div>
  );
}
