import * as types from '../constants';

import { showErrorToDeveloper } from '../helpers';

const initialState = {
  isLoading: false,
  data: {}
};

const account = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_ACCOUNT_DATA_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case types.GET_ACCOUNT_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data
      };

    case types.GET_ACCOUNT_DATA_ERROR:
      showErrorToDeveloper(action);
      return state;

    case types.SET_ACCOUNT_DATA_SUCCESS:
      return {
        ...state,
        data: action.data
      };

    case types.SET_ACCOUNT_DATA_ERROR:
      showErrorToDeveloper(action);
      return state;

    default:
      return state;
  }
}

export default account;
