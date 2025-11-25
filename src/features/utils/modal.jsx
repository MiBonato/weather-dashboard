// components/Modal.jsx
import React from 'react';

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modalOverlay flex w-100 jc-center ai-center" onClick={handleOverlayClick} role="presentation">
      <div className="modalContent" role="dialog" aria-modal="true" aria-label={title} onClick={handleContentClick}>
        <div className="modalHeader flex s-row jc-between ai-center">
          {title && <div className="modalTitle">{title}</div>}
          <button type="button" className="modalCloseBtn flex ai-start" onClick={onClose} aria-label="Fermer la fenêtre"><img src="close-x.svg" alt="Fermer" className="close-icon"/></button>
        </div>
        <div className="modalBody">
          {children}
        </div>
      </div>
    </div>
  );
};
