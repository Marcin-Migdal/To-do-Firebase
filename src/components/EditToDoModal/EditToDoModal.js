import { CustomButton, CustomInput, CustomModal, CustomModalBody, CustomModalFooter, CustomModalHeader } from 'components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdRestoreFromTrash } from 'react-icons/md';
import './EditToDoModal.css';

export const EditToDoModal = ({ editData, handleEditToDo }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState(undefined);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    modalOpen && setForm({ name: editData.name, description: editData?.description, subList: editData.subList });
  }, [modalOpen, editData]);

  const closeModal = () => {
    setForm(undefined);
    setModalOpen(false);
  };

  const handleChangeState = target => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const toDo = {
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      subList: form.subList?.filter(item => !!item.name.trim()),
    };

    handleEditToDo(toDo);
    closeModal();
  };

  const handleChangeListState = e => {
    const { name, value } = e.target;
    let subList = form.subList;

    subList[name] = { ...subList[name], name: value };
    setForm({ ...form, subList: subList });
  };

  const handleDelete = itemToDelete => {
    let subList = form.subList.filter(item => item.id !== itemToDelete.id);
    setForm({ ...form, subList });
  };

  return (
    <>
      <CustomButton tabIndex={-1} outlined label="Edit" className="btn" onClick={() => setModalOpen(true)} />
      <CustomModal modalOpen={modalOpen} closeModal={closeModal}>
        {modalOpen && (
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <CustomModalHeader title={`${t('Edit')} ${editData.name}`} closeModal={closeModal} />
            <CustomModalBody className="edit-to-do-modal">
              <CustomInput label="Name" name="name" value={form?.name || ''} onChange={handleChangeState} />
              <CustomInput
                autoComplete="off"
                label="Description"
                name="description"
                value={form?.description || ''}
                onChange={handleChangeState}
              />
              {form?.subList?.length > 0 && (
                <>
                  <h3 className="sub-list-title">{t('List')}</h3>
                  <ul className="sub-list">
                    {form.subList.map((item, index) => (
                      <li key={item.id}>
                        <div className="content">
                          <input autoComplete="off" value={item.name} name={index} onChange={handleChangeListState} />
                          <MdRestoreFromTrash className="icon" onClick={() => handleDelete(item)} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </CustomModalBody>
            <CustomModalFooter okBtnText="Save" okBtnDisabled={!form?.name.trim()} onCancel={closeModal} />
          </form>
        )}
      </CustomModal>
    </>
  );
};
