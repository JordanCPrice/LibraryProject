import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import { useUser } from "../../globalData/UserContext"; // Adjust import path if needed
import "./Modal.css"; // Import modal styles

const LoginModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setLoggedInUser } = useUser(); // Access context function to set user

  const handleSubmit = async () => {
    const user = {
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:7777/auth", user);

      if (response.status === 200) {
        // Assuming the response returns user info (adjust as needed)
        const loggedInUser = response.data;
        
        // Save the logged-in user in context and localStorage
        setLoggedInUser(loggedInUser);

        // Sync with localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        setOpenSnackbar(true);
        navigate("/"); // Redirect to the home page after successful login
        onClose(); // Close the modal
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  const handleClose = () => {
    // Clear form fields when the modal closes
    setEmail("");
    setPassword("");
    onClose();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box">
          <h2>Login</h2>
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
          <Button className="modal-button" onClick={handleSubmit}>
            Login
          </Button>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: "100%", maxWidth: "600px", borderRadius: "8px", padding: "16px", fontSize: "18px" }}>
          Login Successful!
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginModal;
