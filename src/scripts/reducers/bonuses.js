import * as types from '../constants';

import { showErrorToDeveloper } from '../helpers';

const initialState = {};

const bonuses = (state = initialState, action) => {
  switch (action.type) {

    case types.FETCH_FILL_INFO_BONUS_SUCCESS:
      return {
        ...state,
        fillInfo: action.bonus
      };

    case types.FETCH_FILL_INFO_BONUS_FAILURE:
      showErrorToDeveloper(action);
      return state;

    default:
      return state;
  }
}

export default bonuses;
