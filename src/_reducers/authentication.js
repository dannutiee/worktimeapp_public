// const initialState = {
//   isLogged: false,
//   user: {},
//   errorMessage: ''
// };

//console.log('state authentication', state);

export const authentication = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {
        isLoggedOut: 'loggedout'
      };
    case 'CREATE_USER':
      return {
        signedUp: 'signedUp'
      };

    default:
      return state;
  }
};

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user;
    default:
      return state;
  }
};
