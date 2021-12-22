import { createContext, useContext, useState } from 'react';

export const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
  const [toDo, setToDo] = useState('');

  return <ToDoContext.Provider value={{ toDo, setToDo }}>{children}</ToDoContext.Provider>;
};

export const useToDo = () => {
  const { toDo, setToDo } = useContext(ToDoContext);

  return { toDo, setToDo };
};
