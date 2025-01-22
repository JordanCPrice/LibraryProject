import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../globalData/UserContext";
import "./Modal.css";
import { Snackbar, Alert } from "@mui/material";

const LoginModal = ({ open, onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });
  const [generalError, setGeneralError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const { setLoggedInUser } = useUser();

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    setFieldErrors((prevErrors) => ({ ...prevErrors, [field]: "" })); // Clear field error
  };

  const handleSubmit = async () => {
    const errors = {};
    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    const user = { email, password };

    try {
      const response = await axios.post("http://localhost:7777/auth", user);
      if (response.status === 200) {
        const loggedInUser = response.data;
        setLoggedInUser(loggedInUser);
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        setOpenSnackbar(true);
        handleClose();
        navigate("/");
      }
    } catch (error) {
      setGeneralError("Login failed. Please confirm email and password.");
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setFieldErrors({
      email: "",
      password: "",
    });
    setGeneralError("");
    onClose();
  };

  // Automatically hide the general error after 3 seconds
  useEffect(() => {
    if (generalError) {
      const timer = setTimeout(() => {
        setGeneralError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [generalError]);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box">
          <h2>Login</h2>
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
            Login
          </Button>
          {generalError && <div className="error-message">{generalError}</div>}
          <Button className="modal-button" onClick={onSwitchToRegister}>
            Don't have an account? Register here.
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
          Login Successful!
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginModal;
