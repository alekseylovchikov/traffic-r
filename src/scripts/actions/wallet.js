import api         from '../../../config/api';
import * as types  from '../constants';
import { request } from '../helpers';

import { fetchBets }          from './bets';
import { fetchFillInfoBonus } from './bonuses';

function requestUserWalletData() {
  return {
    type: types.GET_USER_WALLET_DATA_REQUEST
  }
};

function receiveUserWalletDataSuccess(json) {
  return {
    type: types.GET_USER_WALLET_DATA_SUCCESS,
    data: json
  }
};

function receiveUserWalletDataError(status, data) {
  return {
    type: types.GET_USER_WALLET_DATA_ERROR,
    status, data
  }
};

function setWalletActiveBalanceSuccess(data) {
  return {
    type: types.SET_WALLET_ACTIVE_BALANCE_SUCCESS,
    balanceType: data.balanceType
  }
};

function setWalletActiveBalanceError(status, data) {
  return {
    type: types.SET_WALLET_ACTIVE_BALANCE_ERROR,
    status, data
  }
};

export const fetchUserWalletData = (update = false, first = false) => {
  return (dispatch) => {

    const trigger = (first) ? fetchFillInfoBonus : null;

    return request(dispatch, {
      request : (!update) ? requestUserWalletData : null,
      success : receiveUserWalletDataSuccess,
      failure : receiveUserWalletDataError,
      trigger : trigger,
      url     : api.WALLET_GET_DATA
    });
  }
};

export const setWalletActiveBalance = (balanceType) => {
  return (dispatch) => {
    return request(dispatch, {
      success : setWalletActiveBalanceSuccess,
      failure : setWalletActiveBalanceError,
      trigger : fetchBets,
      url     : api.WALLET_SET_ACTIVE_BALANCE,
      method  : 'patch',
      data    : {
        balanceType: balanceType
      }
    });
  }
};

export const updateWalletBalance = (amount) => {
  return {
    type: types.UPDATE_WALLET_BALANCE,
    amount
  }
};
