// Tasks Reducer

const tasksReducerDefaultState = [];

const tasksReducer = (state = tasksReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.task];
    case 'EDIT_TASK':
      return state.map(task => {
        if (task.id === action.id) {
          return {
            ...task,
            ...action.updates
          };
        } else {
          return task;
        }
      });
    case 'DELETE_TASK':
      return state.filter(({ id }) => id !== action.id);
    case 'SET_TASKS':
      return action.tasks;
    default:
      return state;
  }
};

export default tasksReducer;
