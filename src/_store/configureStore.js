import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import tasksReducer from '../_reducers/tasks';
import workReducer from '../_reducers/work';
import { userReducer, authentication } from '../_reducers/authentication';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      authentication: authentication,
      user: userReducer,
      tasks: tasksReducer,
      work: workReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
