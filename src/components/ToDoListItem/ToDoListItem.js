import { GoChevronDown, GoCheck } from 'react-icons/go';
import './ToDoListItem.css';

export const ToDoListItem = ({ toDo, handleSelect, toggleExtended, completeToDo, completeSubToDo }) => (
  <li className={`item ${toDo.selected ? 'selected' : ''} ${toDo.expanded ? 'expanded' : ''}`} onClick={() => handleSelect(toDo)}>
    <div className="item-top-container">
      <>
        {toDo?.description || toDo?.subList?.length > 0 ? (
          <GoChevronDown className={`toggle-arrow-icon ${toDo.expanded ? 'expanded' : ''}`} onClick={e => toggleExtended(e, toDo)} />
        ) : (
          <div className="toggle-arrow-icon placeholder" />
        )}
        <p className="name">{toDo.name}</p>
        <p className="date">{toDo.creationDt}</p>
        <div className="completed-btn" onClick={e => completeToDo(e, toDo)}>
          <GoCheck />
        </div>
      </>
    </div>
    {toDo.expanded && (
      <>
        <div className="item-expanded-container">
          {toDo?.description && (
            <>
              <hr className="custom-hr" />
              <span className="description">{toDo.description}</span>
            </>
          )}
          {toDo?.subList?.length > 0 && (
            <>
              <hr className="custom-hr" />
              <div className="section-container">
                <ul className="sub-list">
                  {toDo.subList.map(subToDo => {
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
