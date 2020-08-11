import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, {history} from './_routers/AppRouter';
import configureStore from './_store/configureStore';
import { Provider } from 'react-redux';
import { startSetTasks } from './_actions/tasks';
import { startSetWork } from './_actions/work';
import { login, logout, startSetUser } from './_actions/authentication';
import {firebase } from './firebase/firebase';
import Loading from './components/Loading';
import 'normalize.css/normalize.css';

const store = configureStore();

const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );

  let hasRendered = false;
  const renderApp = () => {
    if(!hasRendered){
      ReactDOM.render(jsx, document.getElementById('app'));
      hasRendered = true;
    }
  }
  
  ReactDOM.render(<Loading />, document.getElementById('app'));
  
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      store.dispatch(login(user.uid));
      store.dispatch(startSetWork());
      store.dispatch(startSetUser());
      store.dispatch(startSetTasks()).then(()=>{
        renderApp();
        if( history.location.pathname === '/'){
          history.push('/home');
        }
       })
   
    }else{
      store.dispatch(logout());
      renderApp();
      history.push('/')
    }
  })

