import { CustomModal, CustomModalBody, CustomModalFooter, CustomModalHeader } from 'components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineHelpOutline } from 'react-icons/md';

export const HelpModal = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="item help no-select" onClick={openModal}>
        <div className="icon-container">
          <MdOutlineHelpOutline className="icon" />
        </div>
        <p className="text">{t('Help')}</p>
      </div>
      <CustomModal modalOpen={modalOpen} closeModal={closeModal}>
        {modalOpen && (
          <>
            <CustomModalHeader title={t('Help')} closeModal={closeModal} />
            <CustomModalBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in lorem vel eros consequat blandit sit amet id urna.
              Aenean egestas neque nec turpis imperdiet, ac sollicitudin erat lobortis. Proin eget dignissim diam, id finibus ligula. Sed
              scelerisque vehicula ipsum
            </CustomModalBody>
            <CustomModalFooter cancelBtnDisplay={false} onOk={closeModal} okBtnText="Close" />
          </>
        )}
      </CustomModal>
    </>
  );
};
