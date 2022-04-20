import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { GoChevronDown } from 'react-icons/go';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { CustomButton, EditToDoModal, CustomInput, ToDoListItem, CustomTextarea, LoadingIndicator } from 'components';
import { handleAddTodo, handleUpdateTodo, handleGetTodo, handleCompleteTodo } from 'api/todoApi';
import { validateValue } from 'helpers/validateValue';
import { validationSchema } from './formikConfig';
import { formatDate } from 'helpers/formatDate';
import { useResolved } from 'hooks/useResolved';
import { useToDo } from 'context';
import './ToDoList.css';

export const ToDoList = () => {
  const ref = useRef();
  const { showToast, userConfig } = useToDo();
  const { t, i18n } = useTranslation();

  const [toDoArray, setToDoArray] = useState([]);
  const [toDoFormData, setToDoFormData] = useState({ name: '', description: '' });
  const [errors, setErrors] = useState();

  const [descriptionInputEnabled, setDescriptionInputEnabled] = useState(false);

  const resolved = useResolved(toDoArray);

  const handleError = useCallback((message, title = 'Internal error') => showToast(title, message, 'error'), [showToast]);

  useEffect(() => {
    const getToDoData = async () => {
      try {
        let res = await handleGetTodo(userConfig?.uid);

        res.length !== 0 && (res[0].selected = true);
        setToDoArray(res);
      } catch (e) {
        handleError('Error ocurred while fetching to do, please try again.');
      }
    };

    userConfig && getToDoData();
  }, [userConfig?.uid, handleError]);

  useEffect(() => {
    if (toDoArray && ref?.current) {
      const expandedListElement = [...ref.current?.children].find(li => li.className.includes('expanded'));
      if (!expandedListElement) return;

      const expandedElementBottom = expandedListElement.getBoundingClientRect().top + 320; // 320 is a height that expandedListElement gains when expanded
      const parentBottom = ref?.current.getBoundingClientRect().bottom;

      if (expandedElementBottom && parentBottom < expandedElementBottom) {
        setTimeout(() => {
          expandedListElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }, 225); // i had to use setTimeout, because css transition, delays setting proper element height
      }
    }
  }, [toDoArray]);

  const handlePressEnter = e => {
    if (e.code !== 'Enter' || !toDoFormData?.name.trim()) return;

    if (e.shiftKey) {
      const selectedToDo = toDoArray.find(toDo => toDo.selected);
      selectedToDo && addToDoSubListElement(selectedToDo);
    } else {
      addToDo(e);
    }
  };

  const addToDo = async e => {
    e.preventDefault();

    try {
      const toDoRequest = {
        id: `to-do-${uuidv4()}`,
        uid: userConfig.uid,
        name: toDoFormData.name,
        description: toDoFormData.description,
        creationDt: formatDate(),
        subList: [],
        completed: false,
      };

      await handleAddTodo(toDoRequest, handleError);

      setToDoArray([{ ...toDoRequest, selected: true }, ...toDoArray.map(r => ({ ...r, expanded: false, selected: false }))]);
      setToDoFormData({ name: '', description: '' });
      showToast('Success', 'To do was added successfully.');
    } catch (e) {
      handleError('Error ocurred while adding to do, please try again.');
    }
  };

  const addToDoSubListElement = async selectedToDo => {
    try {
      const toDoRequest = {
        ...selectedToDo,
        subList: [
          ...selectedToDo.subList,
          { id: `to-do-${selectedToDo.id}-sub-list${uuidv4()}`, name: toDoFormData.name, completed: false },
        ],
      };

      await handleUpdateTodo(toDoRequest);
      const updatedToDoArray = toDoArray.map(toDo => (toDo.selected ? toDoRequest : toDo));

      setToDoArray(updatedToDoArray);
      setToDoFormData({ ...toDoFormData, name: '' });
      showToast('Success', 'Sub task was added successfully.');
    } catch (e) {
      handleError('Error ocurred while adding sub list element, please try again.');
    }
  };

  const handleEditToDo = async updatedToDo => {
    try {
      await handleUpdateTodo(updatedToDo);

      const updatedToDoArray = toDoArray.map(toDo => (toDo.id === updatedToDo.id ? updatedToDo : toDo));

      setToDoArray(updatedToDoArray);
      showToast('Success', 'To do was edited successfully.');
    } catch {
      handleError('Error ocurred while updating to do, please try again.');
    }
  };

  const handleSelect = useCallback(
    selectedToDo => {
      if (selectedToDo?.selected) return;
      setToDoArray(
        toDoArray.map(toDo => (toDo.id === selectedToDo.id ? { ...toDo, selected: true } : { ...toDo, selected: false, expanded: false })),
      );
    },
    [toDoArray],
  );

  const toggleExtended = useCallback(
    (e, expandedToDo) => {
      e.stopPropagation();
      const updatedToDoArray = toDoArray.map(toDo => {
        if (toDo.id === expandedToDo.id) return { ...toDo, expanded: !toDo.expanded, selected: true };
        else return { ...toDo, expanded: false, selected: false };
      });

      setToDoArray(updatedToDoArray);
    },
    [toDoArray],
  );

  const completeToDo = useCallback(
    async (e, toDo) => {
      try {
        e.stopPropagation();

        const toDoRequest = { ...toDo, completed: true, subList: toDo.subList.map(item => ({ ...item, completed: true })) };

        await handleCompleteTodo(toDoRequest, handleError);
        let updatedToDoArray = toDoArray.filter(toDo => toDo.id !== toDoRequest.id);
        updatedToDoArray.length !== 0 && (updatedToDoArray[0].selected = true);
        setToDoArray(updatedToDoArray);
        showToast('Success', 'To do was completed successfully.');
      } catch (e) {
        handleError('Error ocurred while completing to do, please try again.');
      }
    },
    [toDoArray, showToast, handleError],
  );

  const completeSubToDo = useCallback(
    async (editedToDo, completedSubToDo) => {
      try {
        const subList = editedToDo.subList.map(item => (item.id === completedSubToDo.id ? { ...item, completed: true } : item));
        const toDoRequest = { ...editedToDo, subList };

        await handleUpdateTodo(toDoRequest);
        const updatedToDoArray = toDoArray.map(toDo => (toDo.id === toDoRequest.id ? toDoRequest : toDo));

        setToDoArray(updatedToDoArray);
        showToast('Success', 'Sub task was completed successfully.');
      } catch {
        handleError('Error ocurred while completing sub list element, please try again.');
      }
    },

    [toDoArray, showToast, handleError],
  );

  const toggleDescriptionInput = () => {
    setDescriptionInputEnabled(!descriptionInputEnabled);
  };

  const handleChange = async e => {
    const { name, value } = e.target;

    setToDoFormData({ ...toDoFormData, [name]: value });
    validateValue(e.target, validationSchema, errors, e => setErrors(e));
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
              <EditToDoModal editData={toDoArray.find(toDo => toDo.selected)} handleEditToDo={handleEditToDo} />
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
              e.code === 'Enter' && !toDoFormData?.name.trim() && addToDo(e);
            }}
            disabled={!descriptionInputEnabled}
            className={`to-do-description ${i18n.language === 'pl' ? 'lng-pl' : 'lng-en'} ${toDoArray?.length > 0 ? 'wide' : ''}`}
          />
        </div>

        <ul ref={ref} className="list">
          {resolved ? (
            <ToDoListItems
              toDoArray={toDoArray}
              handleSelect={handleSelect}
              toggleExtended={toggleExtended}
              completeToDo={completeToDo}
              completeSubToDo={completeSubToDo}
            />
          ) : (
            <LoadingIndicator />
          )}
        </ul>
      </div>
    </>
  );
};

const ToDoListItems = memo(props => {
  const { toDoArray, handleSelect, toggleExtended, completeToDo, completeSubToDo } = props;

  return toDoArray.map(toDo => (
    <ToDoListItem
      key={toDo.id}
      toDo={toDo}
      handleSelect={handleSelect}
      toggleExtended={toggleExtended}
      completeToDo={completeToDo}
      completeSubToDo={completeSubToDo}
    />
  ));
});
