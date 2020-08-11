import { firebase, googleAuthProvider } from '../firebase/firebase';
import database from '../firebase/firebase';

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};

export const login = uid => ({
  type: 'LOGIN',
  uid
});

export const startLoginWithEmail = (email, password, catchError) => {
  return () => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
        if (error) {
          catchError(error);
          return error;
        }
      });
  };
};

export const startLoginWithGoogle = () => {
  return () => {
    return firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .catch(error => {
        console.log(error);
      });
  };
};

export const createUser = user => ({
  type: 'CREATE_USER',
  user
});

export const startCreateUser = (newUserData = {}, catchError) => {
  return dispatch => {
    const {
      firstName = '',
      lastName = '',
      email = '',
      password = ''
    } = newUserData;
    const newUser = { firstName, lastName, email };
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        database
          .ref(`users/${resp.uid}/auth`)
          .push(newUser)
          .then(() => {
            dispatch(
              createUser({
                id: resp.uid,
                ...newUser
              })
            );
          });
      })
      .catch(error => {
        catchError(error);
        console.log(error);
      });
  };
};

export const setUser = user => ({
  type: 'SET_USER',
  user
});

export const startSetUser = () => {
  return (dispatch, getState) => {
    const uid = getState().authentication.uid;
    return database
      .ref(`users/${uid}/auth`)
      .once('value')
      .then(snapshot => {
        const user = [];
        snapshot.forEach(childSnapshot => {
          user.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setUser(user));
      });
  };
};
