import React, { useState, useEffect } from "react";
import axios from "axios";
import { Snackbar, Button } from "@mui/material";
import "./Profile.css";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false); // Track if in edit mode
  const [updatedProfile, setUpdatedProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false); // Track if password change section is shown

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false); // Snackbar visibility

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setProfileData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
      setUpdatedProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } else {
      setError("You are not logged in.");
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedProfile({
      ...updatedProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      setError("User is not logged in.");
      return;
    }

    const parsedUser = JSON.parse(loggedInUser);
    const updatedUser = {
      ...updatedProfile,
      id: parsedUser.id,  // Include the userId in the updated data
    };

    axios
      .put(`http://localhost:7777/users/${profileData?.email}`, updatedUser)
      .then((response) => {
        // Update the profile state
        setProfileData(updatedProfile);

        // Update the loggedInUser in localStorage with the new profile data including userId
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

        // Exit edit mode
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setError("There was an error updating your profile.");
      });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      setError("User is not logged in.");
      return;
    }

    const parsedUser = JSON.parse(loggedInUser);

    axios
      .put(`http://localhost:7777/users/${parsedUser.email}/change-password`, {
        currentPassword,
        newPassword,
        confirmPassword,
      })
      .then((response) => {
        setOpenSnackbar(true); // Show Snackbar on successful password change
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowChangePassword(false);
      })
      .catch((error) => {
        console.error("Error changing password:", error.response?.data || error.message);
        setPasswordError(error.response?.data?.message || "There was an error changing your password.");
      });
  };

  const toggleChangePasswordSection = () => {
    setShowChangePassword(!showChangePassword); // Toggle visibility of the change password section
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="profile-page">
      <h2>User Profile</h2>

      {isEditing ? (
        <div className="profile-info-edit">
          <input
            type="text"
            name="firstName"
            value={updatedProfile.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            value={updatedProfile.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={updatedProfile.email}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="profile-info">
          <p><strong>First Name:</strong> {profileData?.firstName}</p>
          <p><strong>Last Name:</strong> {profileData?.lastName}</p>
          <p><strong>Email:</strong> {profileData?.email}</p>
        </div>
      )}

      {/* Centered buttons */}
      <div className="button-container">
        <button onClick={handleEditClick}>Edit Profile</button>
        <button onClick={toggleChangePasswordSection}>
          {showChangePassword ? "Cancel" : "Change Password"}
        </button>
      </div>

      {showChangePassword && (
        <div className="change-password-form">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {passwordError && <p className="password-error">{passwordError}</p>}
          <button onClick={handleChangePassword}>Change Password</button>
        </div>
      )}

      {/* Snackbar for successful password change */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Password changed successfully"
      />
    </div>
  );
};

export default Profile;
