import * as types from '../constants';

import { showErrorToDeveloper } from '../helpers';

const initialState = {
  loading: false
};

const bets = (state = initialState, action) => {
  switch (action.type) {

    case types.ADD_CHARTS: {

      const asset = action.items[0].asset.split('-')[0];

      return {
        ...state,
        [asset]: {
          opened: [],
          closed: []
        },
        [asset]: {
          opened: [],
          closed: []
        }
      };
    }

    // Temporary
    case types.REMOVE_CHARTS: {
      return state;
    }

    case types.ADD_BET_FRONTEND_SUCCESS: {

      const asset  = action.data.asset;
      const opened = state[asset].opened.concat([action.data]);

      return {
        ...state,
        [asset]: {
          ...state[asset],
          opened: opened
        }
      };
    }

    case types.FETCH_BETS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.FETCH_BETS_SUCCESS: {

      const bets = {};

      action.bets.forEach((bet) => {

        const asset = bet.asset;

        if (!bets[asset]) {
          bets[asset] = {
            opened: [],
            closed: []
          }
        }

        switch (bet.state) {
          case 'closed':
            bets[asset].closed.push(bet);
            break;

          case 'opened':
            bets[asset].opened.push(bet);
            break;
        }

      });

      let newState = {...state};

      for (let array in bets) {
        newState = {...newState, [array]: bets[array]};
      }

      return newState;
    }

    case types.ADD_BET_BACKEND_SUCCESS: {

      // const asset   = action.data.asset;
      // const time    = action.data.openingTime;

      // const opened = state[asset].opened.concat([]);

      // const index = opened.findIndex((bet) => {
      //   return (bet.openingTime === time);
      // });

      // opened[index] = action.data;

      // return {
      //   ...state,
      //   [asset]: {
      //     ...state[asset],
      //     opened: opened
      //   }
      // };

      const asset  = action.data.asset;
      const opened = state[asset].opened.concat([action.data]);

      return {
        ...state,
        [asset]: {
          ...state[asset],
          opened: opened
        }
      };
    }

    case types.CLOSE_BET_FRONTEND_SUCCESS: {

      const asset  = action.bet.asset;
      const time   = action.bet.openingTime;

      const opened = state[asset].opened.concat([]);

      const index = opened.findIndex((bet) => {
        return (bet.openingTime === time);
      });

      // Set new state
      opened[index].state = 'closed';

      // Add to closed array
      const closed = state[asset].closed.concat([opened[index]]);

      // Remove from opened array
      opened.splice(index, 1);

      return {
        ...state,
        [asset]: {
          ...state[asset],
          opened: opened,
          closed: closed
        }
      };
    }

    case types.CHECK_BETS_FRONTEND_SUCCESS:
      return state;

    case types.CHECK_BETS_BACKEND_SUCCESS: {

      const asset = action.bets[0].asset;
      const ids   = action.bets.map(bet => bet.id);

      // Remove closed bets from opened
      const opened = state[asset].opened.filter((bet) => {
        if (ids.indexOf(bet.id) === -1) {
          return bet;
        }
      });

      // And add them to closed
      const closed = state[asset].closed.concat(action.bets);

      return {
        ...state,
        [asset]: {
          ...state[asset],
          opened: opened,
          closed: closed
        }
      };
    }

    case types.FETCH_BETS_FAILURE:
    case types.ADD_BET_FRONTEND_FAILURE:
    case types.ADD_BET_BACKEND_FAILURE:
    case types.CLOSE_BET_FRONTEND_FAILURE:
    case types.CHECK_BETS_FRONTEND_FAILURE:
    case types.CHECK_BETS_BACKEND_FAILURE:
      showErrorToDeveloper(action);
      return state;

    default:
      return state;
  }
};

export default bets;
