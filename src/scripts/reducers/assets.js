import * as types from '../constants';

import { showErrorToDeveloper } from '../helpers';

const initialState = {
  loading: false,
  data: []
};

const assets = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_ASSETS_DATA_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.GET_ASSETS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data
      };

    case types.GET_ASSETS_DATA_ERROR:
      showErrorToDeveloper(action);
      return state;

    default:
      return state;
  }
}

export default assets;
