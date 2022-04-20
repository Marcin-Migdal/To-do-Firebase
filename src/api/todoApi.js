import { collection, doc, getDocs, query, setDoc, updateDoc, where, writeBatch } from 'firebase/firestore';
import { fb } from 'service';

export const handleAddTodo = async todo => {
  await setDoc(doc(fb.firestore, 'toDo', todo.id), todo);
};

export const handleCompleteTodo = async todo => {
  const db = fb.firestore;
  const batch = writeBatch(db);

  let _todo = JSON.parse(JSON.stringify(todo));
  delete _todo['selected'];
  delete _todo['expanded'];

  batch.set(doc(db, 'toDoHistory', _todo.id), _todo);
  batch.update(doc(db, 'toDo', todo.id), { completed: true });

  await batch.commit();
};

export const handleUpdateTodo = async todo => {
  let _todo = JSON.parse(JSON.stringify(todo));
  delete _todo['selected'];
  delete _todo['expanded'];
  await updateDoc(doc(fb.firestore, 'toDo', _todo.id), _todo);
};

export const handleGetTodo = async uid => {
  const querySnapshot = await getDocs(query(collection(fb.firestore, 'toDo'), where('uid', '==', uid), where('completed', '==', false)));

  let res = [];
  querySnapshot.forEach(doc => res.push(doc.data()));
  return res;
};
