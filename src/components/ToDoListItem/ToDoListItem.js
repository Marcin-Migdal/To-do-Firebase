import { useTranslation } from 'react-i18next';
import { GoChevronDown, GoCheck } from 'react-icons/go';
import './ToDoListItem.css';

export const ToDoListItem = ({ toDo, selectedToDo, expandedToDo, handleSelect, toggleExtended, deleteToDo, completeSubToDo }) => {
  const { t } = useTranslation();

  return (
    <li
      className={`item ${toDo.id === selectedToDo.id ? 'selected' : ''} ${expandedToDo?.id === toDo.id ? 'expanded' : ''}`}
      onClick={() => handleSelect(toDo)}
    >
      <div className="item-top-container">
        <>
          {toDo?.description || toDo?.subList ? (
            <GoChevronDown
              className={`toggle-arrow-icon ${expandedToDo?.id === toDo.id ? 'expanded' : ''}`}
              onClick={e => toggleExtended(e, toDo)}
            />
          ) : (
            <div className="toggle-arrow-icon placeholder" />
          )}
          <p className="name">{toDo.name}</p>
          <p className="date">{toDo.creationDt}</p>
          <div className="completed-btn" onClick={e => deleteToDo(e, toDo)}>
            <GoCheck />
          </div>
        </>
      </div>
      {expandedToDo?.id === toDo.id && (
        <>
          <div className="item-expanded-container">
            {toDo?.description && (
              <>
                <hr className="custom-hr" />
                <div className="section-container">
                  <h3 className="section-title">{t('Description')}:</h3>
                  <span className="description">{toDo.description}</span>
                </div>
              </>
            )}
            {toDo?.subList && (
              <>
                <hr className="custom-hr" />
                <div className="section-container">
                  <h3 className="section-title">{t('List')}:</h3>
                  <ul className="sub-list">
                    {toDo.subList.length > 0 &&
                      toDo.subList.map(subToDo => {
                        return (
                          <li key={subToDo.id} className={`sub-list-item ${subToDo?.completed ? 'completed' : ''}`}>
                            <div>
                              <p>
                                {subToDo.name} <span />
                              </p>
                              {!subToDo?.completed && (
                                <div className="completed-btn" onClick={() => completeSubToDo(toDo, subToDo)}>
                                  <GoCheck />
                                </div>
                              )}
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </li>
  );
};
