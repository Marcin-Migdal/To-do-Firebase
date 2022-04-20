import { CustomButton, CustomInput, CustomModal, CustomModalBody, CustomModalFooter, CustomModalHeader, CustomTextarea } from 'components';
import { validateValue } from 'helpers/validateValue';
import { MdRestoreFromTrash } from 'react-icons/md';
import { validationSchema } from './formikConfig';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import './EditToDoModal.css';

export const EditToDoModal = ({ editData, handleEditToDo }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState(undefined);
  const [errors, setErrors] = useState();

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const subList = editData?.subList ? [...editData?.subList] : undefined;
    modalOpen && setForm({ ...editData, subList });
  }, [modalOpen, editData]);

  const closeModal = () => {
    setForm(undefined);
    setErrors(undefined);
    setModalOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const toDo = {
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      subList: form?.subList?.filter(item => !!item.name.trim()),
      selected: true,
    };

    handleEditToDo(toDo);
    closeModal();
  };

  const handleChangeState = async e => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    validateValue(e.target, validationSchema, errors, e => setErrors(e));
  };

  const handleChangeListState = async e => {
    const { name, value } = e.target;
    let subList = form.subList;
    subList[name] = { ...subList[name], name: value };

    setForm({ ...form, subList });
    validateValue(e.target, validationSchema, errors, e => setErrors(e), undefined, 'name');
  };

  const handleDelete = itemToDelete => {
    let subList = form.subList.filter(item => item.id !== itemToDelete.id);
    setForm({ ...form, subList });
  };

  return (
    <>
      {editData && <CustomButton tabIndex={-1} outlined label="Edit" className="btn" onClick={() => setModalOpen(true)} />}
      {modalOpen && (
        <CustomModal modalOpen={modalOpen} closeModal={closeModal}>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <CustomModalHeader title={`${t('Edit')} ${editData.name}`} closeModal={closeModal} />
            <CustomModalBody className="edit-to-do-modal">
              <CustomInput error={errors?.name} label="Name" name="name" value={form?.name || ''} onChange={handleChangeState} />
              <CustomTextarea
                label="Description"
                error={errors?.description}
                name="description"
                value={form?.description || ''}
                onChange={handleChangeState}
                autoResize
              />
              {form?.subList?.length > 0 && (
                <ul className="sub-list">
                  {form.subList.map((item, index) => (
                    <li key={item.id}>
                      <div className="content">
                        <input
                          disabled={item.completed}
                          autoComplete="off"
                          value={item.name}
                          name={index}
                          onChange={handleChangeListState}
                        />
                        {!item.completed && (
                          <>
                            <MdRestoreFromTrash className="icon" onClick={() => handleDelete(item)} />
                            {errors?.[index] && <label className="error-label">{t(errors?.[index])}</label>}
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CustomModalBody>
            <CustomModalFooter okBtnText="Save" okBtnDisabled={!form?.name.trim() || errors} onCancel={closeModal} />
          </form>
        </CustomModal>
      )}
    </>
  );
};
