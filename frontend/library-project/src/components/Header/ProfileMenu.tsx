import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
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
  const location = useLocation(); // React Router hook to get the current location

  // Ensure modals remain open when the route changes to /login
  useEffect(() => {
    if (location.pathname === "/login") {
      setIsLoginModalOpen(true);
      setIsRegisterModalOpen(false); // Close register modal if open
    }
  }, [location.pathname]); // Trigger only on route changes

  const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false); // Close register modal
    handleMenuClose();
  };

  const handleRegisterModalOpen = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false); // Close login modal
    handleMenuClose();
  };

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
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
        onSwitchToRegister={handleSwitchToRegister}
      />

      <RegisterModal
        open={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
        onRegistrationSuccess={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </div>
  );
}
