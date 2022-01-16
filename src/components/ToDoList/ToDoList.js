import { useEffect, useRef, useState } from 'react';
import { GoChevronDown } from 'react-icons/go';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { CustomButton, EditToDoModal, CustomInput, ToDoListItem, CustomTextarea } from 'components';
import { validationSchema } from './formikConfig';
import { formatDate } from 'helpers/formatDate';
import './ToDoList.css';
import { validateValue } from 'helpers/validateValue';

export const ToDoList = () => {
  const ref = useRef();
  const { t, i18n } = useTranslation();

  const [toDoArray, setToDoArray] = useState([]);
  const [toDoFormData, setToDoFormData] = useState({ name: '', description: '' });
  const [selectedToDo, setSelectedToDo] = useState(undefined);
  const [expandedToDo, setExpandedToDo] = useState(undefined);
  const [errors, setErrors] = useState();

  const [descriptionInputEnabled, setDescriptionInputEnabled] = useState(false);

  useEffect(() => {
    if (expandedToDo && ref?.current) {
      const parentBottom = ref?.current.getBoundingClientRect().bottom;
      const expandedListElement = [...ref.current?.children].find(li => li.className.includes('expanded'));
      const expandedElementBottom = expandedListElement.getBoundingClientRect().top + 320;

      if (parentBottom < expandedElementBottom) {
        setTimeout(() => {
          expandedListElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }, 225); // i had to use setTimeout, because css transition, delays setting proper element height
      }
    }
  }, [expandedToDo]);

  const handlePressEnter = e => {
    if (e.code !== 'Enter' || toDoFormData.length < 1) return;

    if (e.shiftKey) {
      addToDoSubListElement();
    } else {
      addToDo(e);
    }
  };

  const addToDo = e => {
    e.preventDefault();
    const { name, description } = toDoFormData;
    if (!name) return;

    const newToDoArray = [{ id: `to-do-${uuidv4()}`, name, description, creationDt: formatDate() }, ...toDoArray];

    setSelectedToDo(newToDoArray[0]);
    setToDoArray(newToDoArray);
    setToDoFormData({ name: '', description: '' });
    setExpandedToDo();
  };

  const addToDoSubListElement = () => {
    const { name } = toDoFormData;

    let updatedToDo;
    let updatedToDoArray = toDoArray.map(toDo => {
      if (toDo.id === selectedToDo.id) {
        const subList = toDo?.subList ? toDo?.subList : [];
        updatedToDo = { ...toDo, subList: [...subList, { id: `to-do-${selectedToDo.id}-sub-silt${uuidv4()}`, name, completed: false }] };
        return updatedToDo;
      } else {
        return toDo;
      }
    });

    setSelectedToDo(updatedToDo);
    setToDoArray(updatedToDoArray);
    setToDoFormData({ ...toDoFormData, name: '' });
  };

  const deleteToDo = (e, toDo) => {
    e.stopPropagation();

    const filteredToDoArray = toDoArray.filter(item => item.id !== toDo.id);

    if (toDo.id === selectedToDo.id && filteredToDoArray.length > 0) {
      setSelectedToDo(filteredToDoArray[0]);
    } else if (filteredToDoArray.length === 0) {
      setSelectedToDo(undefined);
    }

    setToDoArray(filteredToDoArray);
  };

  const handleSelect = toDo => {
    if (selectedToDo.id === toDo.id) return;
    setExpandedToDo();
    setSelectedToDo(toDo);
  };

  const handleEditToDo = updatedToDo => {
    const editedToDo = { ...selectedToDo, ...updatedToDo };
    const updatedToDoArray = toDoArray.map(toDo => {
      if (toDo.id === selectedToDo.id) {
        return editedToDo;
      } else {
        return toDo;
      }
    });

    setSelectedToDo(editedToDo);
    setToDoArray(updatedToDoArray);
  };

  const toggleExtended = (e, toDo) => {
    e.stopPropagation();
    setSelectedToDo(toDo);
    setExpandedToDo(expandedToDo?.id === toDo.id ? undefined : toDo);
  };

  const toggleDescriptionInput = () => {
    setDescriptionInputEnabled(!descriptionInputEnabled);
  };

  const handleChange = async target => {
    const { name, value } = target;

    setToDoFormData({ ...toDoFormData, [name]: value });
    validateValue(target, validationSchema, errors, e => setErrors(e));
  };

  const completeSubToDo = (editedToDo, subToDo) => {
    const updatedToDoArray = toDoArray.map(toDo => {
      if (toDo.id === editedToDo.id) {
        const subList = editedToDo.subList.map(editedSubToDo => {
          if (editedSubToDo.id === subToDo.id) {
            return { ...editedSubToDo, completed: true };
          } else {
            return editedSubToDo;
          }
        });
        return { ...editedToDo, subList };
      } else {
        return toDo;
      }
    });
    setSelectedToDo(editedToDo);
    setToDoArray(updatedToDoArray);
  };

  return (
    <>
      <div className={`to-do ${descriptionInputEnabled ? 'with-description' : ''} no-select`}>
        <div className="top-container">
          <div className="basic-inputs-position-container">
            <div className="basic-inputs">
              <GoChevronDown
                className={`toggle-arrow-icon ${descriptionInputEnabled ? 'expanded' : ''}`}
                onClick={toggleDescriptionInput}
              />
              <CustomInput
                error={errors?.name}
                name="name"
                placeholder="To do"
                className="text-input"
                errorPosition="top"
                onChange={handleChange}
                value={toDoFormData?.name}
                handleKeyPress={handlePressEnter}
              />
              <CustomButton
                tabIndex="-1"
                outlined
                label="Add"
                className="btn"
                onClick={addToDo}
                disabled={!toDoFormData?.name.trim() || errors}
              />
              {selectedToDo && <EditToDoModal editData={selectedToDo} handleEditToDo={updatedToDo => handleEditToDo(updatedToDo)} />}
            </div>
          </div>
          <CustomTextarea
            rows={1}
            name="description"
            error={errors?.description}
            placeholder={t('Description')}
            value={toDoFormData.description}
            onChange={handleChange}
            onKeyPress={e => {
              e.code === 'Enter' && addToDo(e);
            }}
            disabled={!descriptionInputEnabled}
            className={`to-do-description ${i18n.language === 'pl' ? 'lng-pl' : 'lng-en'} ${toDoArray?.length > 0 ? 'wide' : ''}`}
          />
        </div>

        <ul ref={ref} className="list">
          {toDoArray.map(toDo => (
            <ToDoListItem
              key={toDo.id}
              toDo={toDo}
              selectedToDo={selectedToDo}
              expandedToDo={expandedToDo}
              handleSelect={handleSelect}
              toggleExtended={toggleExtended}
              deleteToDo={deleteToDo}
              completeSubToDo={completeSubToDo}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
