import React, { useState } from "react";
import axios from "axios"; // Import axios
import "./DonationPage.css";

const Donation: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    isbn: "",
    totalCopies: 1, // Initialize copies with a default value of 1
  });

  const [message, setMessage] = useState<string>("");

  const [fieldErrors, setFieldErrors] = useState({
    title: "",
    author: "",
    description: "",
    isbn: "",
    totalCopies: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" })); // Clear field error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: any = {};

    // Validation checks for empty fields
    if (!formData.title) errors.title = "Title is required.";
    if (!formData.author) errors.author = "Author is required.";
    if (!formData.description) errors.description = "Description is required.";
    if (!formData.isbn) errors.isbn = "ISBN is required.";
    if (!formData.totalCopies || formData.totalCopies < 1) errors.totalCopies = "Please enter a valid number of copies.";

    // If there are errors, update the state and return
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      // Create the request payload, similar to BookRequestDTO
      const donationData = {
        title: formData.title,
        author: formData.author,
        description: formData.description,
        isbn: formData.isbn,
        totalCopies: formData.totalCopies,
      };

      const response = await axios.post("http://localhost:7777/books", donationData);

      // Handle successful response
      console.log("Book added:", response.data);

      // Show success message
      setMessage("Thank you for your donation!");

      // Reset message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000); // 3 seconds

      // Clear the form
      setFormData({
        title: "",
        author: "",
        description: "",
        isbn: "",
        totalCopies: 1, // Reset the number of copies to 1
      });
    } catch (error) {
      console.error("Error adding book:", error);
      setMessage("There was an issue with your donation. Please try again.");
    }
  };

  return (
    <div className="donation-page">
      <form className="donation-form" onSubmit={handleSubmit}>
        <h2>Donate a Book</h2>

        {/* Title */}
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter book title"
        />
        {fieldErrors.title && <div className="form-error">{fieldErrors.title}</div>}

        {/* Author */}
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author name"
        />
        {fieldErrors.author && <div className="form-error">{fieldErrors.author}</div>}

        {/* Description */}
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter book description"
          rows={4}
        />
        {fieldErrors.description && <div className="form-error">{fieldErrors.description}</div>}

        {/* ISBN */}
        <label htmlFor="isbn">ISBN</label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="Enter ISBN number"
        />
        {fieldErrors.isbn && <div className="form-error">{fieldErrors.isbn}</div>}

        {/* Number of Copies */}
        <label htmlFor="totalCopies">Number of Copies</label>
        <input
          type="number"
          id="totalCopies"
          name="totalCopies"
          value={formData.totalCopies}
          onChange={handleChange}
          min={1} // Set the minimum number of copies to 1
          placeholder="Enter number of copies"
        />
        {fieldErrors.totalCopies && <div className="form-error">{fieldErrors.totalCopies}</div>}

        {/* Submit Button */}
        <button type="submit">Donate Book</button>
      </form>

      {/* Thank You Message */}
      {message && <div className="thank-you-message">{message}</div>}
    </div>
  );
};

export default Donation;
