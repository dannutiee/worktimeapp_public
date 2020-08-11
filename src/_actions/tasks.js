import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_NEW_TASK
export const addNewTask = task => ({
  type: 'ADD_TASK',
  task
});

// START_ADD_NEW_TASK
export const startAddNewTask = (taskData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().authentication.uid;
    const {
      name = '',
      createdAt = 0,
      workTime = 0,
      totalTime = 0,
      status = 'active',
      pausedAt = 0,
      pauseTime = 0,
      label = ''
    } = taskData;
    const newTask = {
      name,
      createdAt,
      workTime,
      totalTime,
      status,
      pausedAt,
      pauseTime,
      label
    };
    database
      .ref(`users/${uid}/tasks`)
      .push(newTask)
      .then(ref => {
        dispatch(
          addNewTask({
            id: ref.key,
            ...newTask
          })
        );
      });
  };
};

//start update task

// REMOVE_TASK
export const deleteTask = ({ id } = {}) => ({
  type: 'DELETE_TASK',
  id
});

export const startDeleteTask = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().authentication.uid;
    return database
      .ref(`users/${uid}/tasks/${id}`)
      .remove()
      .then(() => {
        dispatch(deleteTask({ id }));
      });
  };
};

// EDIT_TASK
export const editTask = (id, updates) => ({
  type: 'EDIT_TASK',
  id,
  updates
});

export const startEditTask = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().authentication.uid;
    return database
      .ref(`users/${uid}/tasks/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editTask(id, updates));
      });
  };
};

// start fetch tasks from database

export const setTasks = tasks => ({
  type: 'SET_TASKS',
  tasks
});

export const startSetTasks = () => {
  return (dispatch, getState) => {
    const uid = getState().authentication.uid;
    return database
      .ref(`users/${uid}/tasks`)
      .once('value')
      .then(snapshot => {
        const tasks = [];
        snapshot.forEach(childSnapshot => {
          tasks.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setTasks(tasks));
      });
  };
};
