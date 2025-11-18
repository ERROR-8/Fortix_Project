import React from 'react';

const backdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1050,
};

const modalStyle = {
  background: '#fff',
  borderRadius: '6px',
  padding: '20px',
  width: '100%',
  maxWidth: '480px',
  boxShadow: '0 6px 18px rgba(0,0,0,0.2)'
};

export default function ConfirmModal({ show, title = 'Confirm', message = 'Are you sure?', onConfirm, onCancel, confirmText = 'Delete' }) {
  if (!show) return null;

  return (
    <div style={backdropStyle} role="dialog" aria-modal="true">
      <div style={modalStyle}>
        <h5 className="mb-2">{title}</h5>
        <p className="mb-4">{message}</p>
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className={`btn ${confirmText.toLowerCase() === 'delete' ? 'btn-danger' : 'btn-primary'}`} onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
