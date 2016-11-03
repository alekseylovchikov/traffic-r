import update from 'react-addons-update';

import { showErrorToDeveloper } from '../helpers';

import * as types from '../constants';

const initialState = {
  isLoading : true,
  data      : {}
};

const wallet = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_USER_WALLET_DATA_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case types.GET_USER_WALLET_DATA_SUCCESS:
      return {
        ...state,
        isLoading : false,
        data      : action.data
      };

    case types.GET_USER_WALLET_DATA_ERROR:
      showErrorToDeveloper(action);
      return state;

    case types.SET_WALLET_ACTIVE_BALANCE_SUCCESS:
      return update(state, {
        data: {
          activeBalance: {
            $set: action.balanceType
          }
        }
      });

    case types.SET_WALLET_ACTIVE_BALANCE_ERROR:
      showErrorToDeveloper(action);
      return state;

    case types.UPDATE_WALLET_BALANCE: {

      const balances = state.data.balances.map((balance, index) => {
        if (balance.balanceType === state.data.activeBalance) {

          switch (balance.balanceType) {
            case 'demo':
              balance.bonus += action.amount;
              break;

            case 'real':

              const bonusRatio = (balance.bonus / (balance.real + balance.bonus)).toFixed(2);
              const realRatio  = 1 - bonusRatio;

              const fromBonus = bonusRatio * action.amount;
              const fromReal  = realRatio  * action.amount;

              balance.bonus += fromBonus;
              balance.real  += fromReal;

              break;
          }
        }

        return balance;
      });

      return {
        ...state,
        data: {
          ...state.data,
          balances: balances
        }
      };
    }

    default:
      return state;
  }
}

export default wallet;
