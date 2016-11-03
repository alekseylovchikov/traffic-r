import * as types from '../constants';

import { showErrorToDeveloper } from '../helpers';

const initialState = {
  time: new Date().getTime()
};

const time = (state = initialState, action) => {
  switch (action.type) {

    case types.UPDATE_TIME:

      const t = {
        time: action.time
      };

      return t;

    default:
      return state;
  }
}

export default time;
