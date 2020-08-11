// Tasks Reducer

const workReducerDefaultState = [];

const workReducer = (state = workReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_WORK':
      return [...state, action.work];
    case 'EDIT_WORK':
      return state.map(work => {
        if (work.id === work.id) {
          return {
            ...work,
            ...action.updates
          };
        } else {
          return work;
        }
      });
    case 'SET_WORK':
      return action.work;
    default:
      return state;
  }
};

export default workReducer;
