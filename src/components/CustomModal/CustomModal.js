import { createPortal } from 'react-dom';
import './CustomModal.css';

export const CustomModal = ({ className = '', children, modalOpen, width = '40rem', closeModal }) => {
  return (
    <>
      {modalOpen &&
        createPortal(
          <>
            <div onClick={closeModal} className="custom-modal-overlay" />
            <div className={`${className} custom-modal-container`} style={{ width: width, left: `calc((100vw - ${width})/2)` }}>
              {children}
            </div>
          </>,
          document.getElementById('app'),
        )}
    </>
  );
};
