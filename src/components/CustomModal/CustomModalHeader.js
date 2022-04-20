import { useTranslation } from 'react-i18next';
import { IoMdClose } from 'react-icons/io';

export const CustomModalHeader = ({ title, closeModal }) => {
  const { t } = useTranslation();

  return (
    <div className="modal-header">
      <h2>{t(title)}</h2>
      <div className="close-btn" onClick={closeModal}>
        <IoMdClose />
      </div>
    </div>
  );
};
