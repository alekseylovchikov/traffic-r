import update from 'react-addons-update';

import {
  WAIT_FOR_GENERATOR, ON_GENERATOR_START, ON_GENERATOR_END,
  UPDATE_GENERATOR_SET_SUCCESS, UPDATE_GENERATOR_SET_ERROR
} from '../constants';

const initialState = {
  id: null,
  asset: '',
  loading: false,
  error: false,
  set: []
};

const generator = (state = initialState, action) => {
  switch (action.type) {

    case WAIT_FOR_GENERATOR:
      return {
        ...state,
        loading: true
      };

    case ON_GENERATOR_START:
      return {
        ...state,
        id: action.generatorId,
        asset: action.asset,
        loading: false,
        error: false
      };

    case ON_GENERATOR_END:
      return initialState;

    case UPDATE_GENERATOR_SET_SUCCESS:

      let set;

      if (action.operation === 'add') {
        set = update(state.set, { $push: action.items });
      } else if (action.operation === 'remove') {
        set = update(state.set, { $unshift: action.items });
      }

      return {
        ...state,
        set: set
      };

    case UPDATE_GENERATOR_SET_ERROR:
      return {
        ...state,
        error: 'Can\'t update requested data'
      };

    default:
      return state;
  }
};

export default generator;
