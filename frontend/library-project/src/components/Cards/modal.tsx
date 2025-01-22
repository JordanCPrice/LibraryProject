import React from "react";

interface ModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay show"> {/* Ensure the overlay is always shown */}
      <div className="modal show"> {/* Ensure the modal is visible */}
        <p>{message}</p>
        {/* Button container to center the buttons */}
        <div className="modal-buttons-container">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel} className="no-button">No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
