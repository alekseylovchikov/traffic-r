import api from '../../../config/api';
import * as types from '../constants';

import { request } from '../helpers';

function receiveWsTokenSuccess(token) {
  return {
    type: types.RECEIVE_WS_TOKEN_SUCCESS,
    token
  }
};

function receiveWsTokenError(status, data) {
  return {
    type: types.RECEIVE_WS_TOKEN_ERROR,
    status, data
  }
};

export const getWsToken = () => {
  return (dispatch) => {
    return request(dispatch, {
      success : receiveWsTokenSuccess,
      failure : receiveWsTokenError,
      url     : api.DATA_GET_TOKEN
    });
  }
};

export const connectToWs = () => {
  return {
    type: types.CONNECT_TO_WS
  }
};

export const disconnectFromWs = () => {
  return {
    type: types.DISCONNECT_FROM_WS
  }
};

export const onWsOpen = () => {
  return {
    type: types.ON_WS_OPEN
  }
};

export const onWsClose = () => {
  return {
    type: types.ON_WS_CLOSE
  }
};

export const onWsError = () => {
  return {
    type: types.ON_WS_ERROR
  }
};

export const onWsMessage = (msg) => {

  msg = JSON.parse(msg);

  return (dispatch) => {

    // Check if we receive time or not
    if (typeof msg !== 'number') {

      // Temporary check if we need to use range within symbol name
      const symbol = (msg.range) ? (msg.symbol + '-' + msg.range) : msg.symbol;

      // dispatch({
      //   type : types.ON_WS_MESSAGE,
      //   item : symbol,
      //   data : msg
      // });

      dispatch({
        type : types.UPDATE_CHART_DATA,
        id   : symbol,
        data : msg
      });

    } else {

      dispatch({
        type : types.UPDATE_TIME,
        time : msg
      });

    }
  }
};

function updateWsSetSuccess() {
  return {
    type: types.UPDATE_WS_SET_SUCCESS
  }
};

function updateWsSetError(status, data) {
  return {
    type: types.UPDATE_WS_SET_ERROR,
    status, data
  }
};

export const addItemsToWsSet = (token, items) => {
  return (dispatch, getState) => {

    token = token || getState().websockets.token;

    const assets = getState().assets.data;
    const profit = {};

    assets.forEach((asset) => {
      profit[asset.symbol] = {
        profitability : asset.profitability,
        availability  : asset.availability
      };
    });

    items.forEach((item) => {
      const asset = item.asset.split('-')[0];

      item.profitability = profit[asset].profitability;
      item.availability  = profit[asset].availability;
    });

    dispatch(updateWsSet(token, items, 'add'));

    dispatch({
      type: types.ADD_CHARTS,
      items
    });
  }
};

export const removeItemsFromWsSet = (token, items) => {
  return (dispatch, getState) => {

    token = token || getState().websockets.token;

    dispatch(updateWsSet(token, items, 'remove'));

    dispatch({
      type: types.REMOVE_CHARTS,
      items
    });
  }
};

export const updateWsSet = (token, items, operation) => {
  return (dispatch) => {

    const set = items.map((item) => {
      return item.asset;
    });

    return request(dispatch, {
      success : updateWsSetSuccess,
      failure : updateWsSetError,
      url     : api.DATA_UPDATE_SET + '/' + operation,
      method  : 'post',
      params  : {
        id: token
      },
      data    : JSON.stringify(set)
    });
  }
};
