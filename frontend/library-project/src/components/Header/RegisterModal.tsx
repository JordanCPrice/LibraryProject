import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./modal.css";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

const RegisterModal = ({ open, onClose, onSwitchToLogin, onRegistrationSuccess }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [generalError, setGeneralError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    setFieldErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const handleSubmit = async () => {
    const errors = {};
    if (!firstName) errors.firstName = "First name is required.";
    if (!lastName) errors.lastName = "Last name is required.";
    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    const newUser = { firstName, lastName, email, password };

    try {
      const response = await axios.post("http://localhost:7777/register", newUser);
      if (response.status === 201) {
        setOpenSnackbar(true);
        onRegistrationSuccess();  // Trigger the login modal after successful registration
        handleClose();
      }
    } catch (error) {
      setGeneralError("Registration failed. Please try again.");
    }
  };

  const handleClose = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setFieldErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    setGeneralError("");
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
            onChange={handleInputChange(setFirstName, "firstName")}
            error={!!fieldErrors.firstName}
            helperText={fieldErrors.firstName}
          />
          <TextField
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={handleInputChange(setLastName, "lastName")}
            error={!!fieldErrors.lastName}
            helperText={fieldErrors.lastName}
          />
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={handleInputChange(setEmail, "email")}
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={handleInputChange(setPassword, "password")}
            error={!!fieldErrors.password}
            helperText={fieldErrors.password}
          />
          <Button className="modal-button" onClick={handleSubmit}>
            Register
          </Button>
          {generalError && <div className="error-message">{generalError}</div>}
          <Button className="modal-button" onClick={onSwitchToLogin}>
            Already have an account? Login here.
          </Button>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity="success"
          sx={{
            width: "100%",
            maxWidth: "600px",
            borderRadius: "8px",
            padding: "16px",
            fontSize: "18px",
          }}
        >
          Registration Successful!
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterModal;
