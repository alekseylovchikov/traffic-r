import * as types from '../constants';

const initialState = {};

const modals = (state = initialState, action) => {
  switch (action.type) {

    case types.SHOW_MODAL:
      return {
        ...state,
        [action.name]: true
      };

    case types.HIDE_MODAL:
      return {
        ...state,
        [action.name]: false
      };

    case types.REDIRECT_MODAL:

      function redirect() {
        window.location.href = action.url;
      };

      setTimeout(redirect, 250);

      return state;

    default:
      return state;
  }
};

export default modals;
