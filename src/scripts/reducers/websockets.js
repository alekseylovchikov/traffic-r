import update from 'react-addons-update';

import { showErrorToDeveloper } from '../helpers';

import * as types from '../constants';

const initialState = {
  token     : null,
  isLoading : false,
  error     : false
};

const websockets = (state = initialState, action) => {

  const data = {...state.data};

  switch (action.type) {

    case types.RECEIVE_WS_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.token
      };

    case types.RECEIVE_WS_TOKEN_ERROR:
      showErrorToDeveloper(action);
      return state;

    case types.CONNECT_TO_WS:
      return {
        ...state,
        isLoading: true
      };

    case types.DISCONNECT_FROM_WS:
      return initialState;

    case types.ON_WS_OPEN:
      return {
        ...state,
        isLoading: false,
        error: false
      };

    case types.ON_WS_CLOSE:
      return {
        ...state,
        token: null,
        data: {},
        isLoading: false
      };

    case types.ON_WS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'Error: can\'t connect to websockets'
      };

    case types.ON_WS_MESSAGE:
      return state;
      // data[action.item] = action.data;

      // return {
      //   ...state,
      //   data: data
      // };

    case types.UPDATE_WS_SET_SUCCESS:
      return state;
      // for (let i = 0; i < action.items.length; i++) {
      //   // Add new items to the data
      //   if (action.operation === 'add') {
      //     data[action.items[i]] = {};

      //   // Remove existing items from the data
      //   } else if (action.operation === 'remove') {
      //     delete data[action.items[i]];
      //   }
      // }

      // return {
      //   ...state,
      //   data: data
      // };

    case types.UPDATE_WS_SET_ERROR:
      showErrorToDeveloper(action);
      return state;
      // return {
      //   ...state,
      //   error: 'Can\'t update requested data'
      // };

    default:
      return state;
  }
};

export default websockets;
