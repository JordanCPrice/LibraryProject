import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./modal.css"; // Import modal styles
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

const RegisterModal = ({ open, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Form data to send to the backend
    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      // Make the API call to register the user
      const response = await axios.post("http://localhost:7777/register", newUser);

      if (response.status === 201) {
        // Handle success (e.g., close the modal, show success message and redirect to login screen.)
        setOpenSnackbar(true);

        navigate("/login");

        handleClose();
      }
    } catch (error) {
      // Handle error (e.g., show an error message)
      setError("Registration failed. Please try again.");
    }
  };

  const handleClose = () => {
    // Clear form fields when the modal closes
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  return (
    <>
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-box">
        <h2>Register</h2>
        <TextField
          label="First Name"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

 
        {/* Display error message if any */}
        {error && <div className="error-message">{error}</div>}

        <Button className="modal-button" onClick={handleSubmit}>
          Register
        </Button>
      </Box>
    </Modal>
    <Snackbar
    anchorOrigin={{vertical: "top", horizontal: "center"}}
    open={openSnackbar}
    autoHideDuration={6000}
    onClose={() => setOpenSnackbar(false)}
  >
    <Alert severity="success" sx={{ width: "100%", maxWidth: "600px", borderRadius: "8px", padding:"16px", fontSize: "18px"}}>
      Registration Successful!
    </Alert>
  </Snackbar>
</>
  );
};

export default RegisterModal;
