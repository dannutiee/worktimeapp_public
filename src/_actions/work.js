import database from '../firebase/firebase';

// start fetch tasks from database
export const setWork = work => ({
  type: 'SET_WORK',
  work
});

export const startSetWork = () => {
  return (dispatch, getState) => {
    const uid = getState().authentication.uid;
    return database
      .ref(`users/${uid}/work`)
      .once('value')
      .then(snapshot => {
        const work = [];

        snapshot.forEach(childSnapshot => {
          work.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setWork(work));
      });
  };
};

// ADD_NEW_TASK
export const addNewWork = work => ({
  type: 'ADD_WORK',
  work
});

// START_ADD_NEW_TASK
export const startAddNewWork = (workData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().authentication.uid;
    const {
      startedAt = 0,
      workTime = 0,
      date = 0,
      status = 'active',
      finishedAt = 0,
      tasks = []
    } = workData;
    const newWork = {
      date,
      startedAt,
      workTime,
      status,
      finishedAt,
      tasks
    };
    database
      .ref(`users/${uid}/work`)
      .push(newWork)
      .then(ref => {
        dispatch(
          addNewWork({
            id: ref.key,
            ...newWork
          })
        );
      });
  };
};

// EDIT_TASK
export const editWork = (id, updates) => ({
  type: 'EDIT_WORK',
  id,
  updates
});

export const startEditWork = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().authentication.uid;
    return database
      .ref(`users/${uid}/work/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editWork(id, updates));
      });
  };
};
