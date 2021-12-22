import { IoMdClose } from 'react-icons/io';

export const CustomModalHeader = ({ title, closeModal }) => {
  return (
    <div className="modal-header">
      <h2>{title}</h2>
      <div className="close-btn" onClick={closeModal}>
        <IoMdClose />
      </div>
    </div>
  );
};
