import api from '../../../config/api';
import * as types from '../constants';

import { getCookie } from '../helpers';
import { request }   from '../helpers';

function userLoginRequest() {
  return {
    type: types.USER_LOGIN_REQUEST
  }
};

function userLoginSuccess(tokens) {
  return {
    type: types.USER_LOGIN_SUCCESS,
    tokens
  }
};

function userLoginError(status, data) {
  return {
    type  : types.USER_LOGIN_ERROR,
    status, data
  }
};

function userLogoutFromAllDevicesSuccess() {
  return {
    type: types.USER_LOGOUT_FROM_ALL_DEVICES_SUCCESS
  }
};

function userLogoutFromAllDevicesError(status, data) {
  return {
    type: types.USER_LOGOUT_FROM_ALL_DEVICES_ERROR,
    status, data
  }
};

export function userTokenRefreshSuccess(tokens) {
  return {
    type: types.USER_TOKEN_REFRESH_SUCCESS,
    tokens
  }
};

export function userTokenRefreshFailure(status, data) {
  return {
    type  : types.USER_TOKEN_REFRESH_FAILURE,
    status, data
  }
};

export const userLogin = () => {
  return (dispatch) => {

    const accessToken  = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');

    // Get new tokens
    if (!accessToken && !refreshToken) {

      return request(dispatch, {
        request : userLoginRequest,
        success : userLoginSuccess,
        failure : userLoginError,
        auth    : false,
        url     : api.USER_LOGIN_BY_EMAIL,
        method  : 'post',
        data    : {
          email    : 'test@test.ru',
          password : 'password',
          role     : 'client'
        }
      });

    } else {

      return request(dispatch, {
        success : userLoginSuccess,
        failure : userLoginError,
        auth    : 'refresh',
        url     : api.USER_REFRESH_TOKEN
      });
    }
  }
};

export const userLogout = () => {
  return (dispatch) => {
    dispatch({
      type: types.USER_LOGOUT_SUCCESS
    });
  }
};

export const userLogoutFromAllDevices = () => {
  return (dispatch) => {
    return request(dispatch, {
      success : userLogoutFromAllDevicesSuccess,
      failure : userLogoutFromAllDevicesError,
      url     : api.USER_LOGOUT
    });
  }
}
