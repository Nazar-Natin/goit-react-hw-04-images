import React, { useEffect, useCallback } from 'react';

const Modal = ({ isOpen, onClose, imageUrl }) => {
  const handleCloseModal = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyPress = event => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOpen, handleCloseModal]);

  return (
    <div
      className={`overlay ${isOpen ? 'open' : ''}`}
      onClick={handleCloseModal}
    >
      <div className="modal">
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

export default Modal;
