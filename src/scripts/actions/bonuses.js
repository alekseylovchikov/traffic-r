import api         from '../../../config/api';
import * as types  from '../constants';
import { request } from '../helpers';

import { showModal } from './modals';

function fetchFillInfoBonusSuccess(bonus) {
  return {
    type : types.FETCH_FILL_INFO_BONUS_SUCCESS,
    bonus
  }
};

function fetchFillInfoBonusFailure(status, data) {
  return {
    type  : types.FETCH_FILL_INFO_BONUS_FAILURE,
    status, data
  }
};

function checkIfBonusIsExpired(name) {
  return (dispatch, getState) => {
    const bonus    = getState().bonuses[name];
    const balances = getState().wallet.data.balances;

    const expire = new Date(bonus.createdAt + bonus.expiration);

    let hasRealBalance = false;

    balances.forEach((balance) => {
      if (balance.balanceType === 'real') {
        hasRealBalance = true;
      }
    });

    // Check if user has no real balance and bonus hasn't expired yet
    if (!hasRealBalance && now <= expire) {
      dispatch(showModal('fillInfo'));
    }
  }
}

export const fetchFillInfoBonus = () => {
  return (dispatch) => {
    return request(dispatch, {
      success : fetchFillInfoBonusSuccess,
      failure : fetchFillInfoBonusFailure,
      trigger : checkIfBonusIsExpired.bind(null, 'fillInfo'),
      url     : api.GET_BONUSES + '/fill_info'
    });
  }
};
