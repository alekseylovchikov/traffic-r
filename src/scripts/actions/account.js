import api         from '../../../config/api';
import * as types  from '../constants';
import { request } from '../helpers';

import { fetchUserWalletData } from './wallet';

function accountDataRequest() {
  return {
    type: types.GET_ACCOUNT_DATA_REQUEST
  }
};

function getAccountDataSuccess(json) {
  return {
    type : types.GET_ACCOUNT_DATA_SUCCESS,
    data : json
  }
};

function getAccountDataError(status, data) {
  return {
    type  : types.GET_ACCOUNT_DATA_ERROR,
    status, data
  }
};

function setAccountDataSuccess(json) {
  return {
    type : types.SET_ACCOUNT_DATA_SUCCESS,
    data : json
  }
};

function setAccountDataError(status, data) {
  return {
    type  : types.SET_ACCOUNT_DATA_ERROR,
    status, data
  }
};

export const getAccountData = () => {
  return (dispatch) => {
    return request(dispatch, {
      request : accountDataRequest,
      success : getAccountDataSuccess,
      failure : getAccountDataError,
      trigger : fetchUserWalletData.bind(null, false, true),
      url     : api.ACCOUNT_GET_DATA
    });
  }
};

export const setAccountData = (data) => {
  return (dispatch) => {
    return request(dispatch, {
      success : setAccountDataSuccess,
      failure : setAccountDataError,
      url     : api.ACCOUNT_SET_DATA,
      method  : 'patch',
      data    : data
    });
  }
}
