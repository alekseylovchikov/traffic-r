import api from '../../../config/api';
import * as types from '../constants';

import { request } from '../helpers';

import { addItemsToWsSet, removeItemsFromWsSet } from './websockets';

function requestAssetsData() {
  return {
    type: types.GET_ASSETS_DATA_REQUEST
  }
};

function receiveAssetsDataSuccess(json) {
  return {
    type: types.GET_ASSETS_DATA_SUCCESS,
    data: json
  }
};

function receiveAssetsDataError(status, data) {
  return {
    type: types.GET_ASSETS_DATA_ERROR,
    status, data
  }
};

export const fetchAssetsData = () => {
  return (dispatch) => {
    return request(dispatch, {
      request : requestAssetsData,
      success : receiveAssetsDataSuccess,
      failure : receiveAssetsDataError,
      url     : api.GET_ASSETS_DATA + '/turbo'
    });
  }
};

export const changeAsset = (currentAsset, currentRange, newAsset, add) => {
  return (dispatch) => {

    // Whether to add a new chart or remove an existing
    add = add || false;

    const itemToRemove = {
      asset : currentAsset + '-' + currentRange,
      group : 0
    };

    const itemToAdd = {
      asset : newAsset + '-' + 5000,
      group : 0
    };

    if (!add) {
      dispatch(removeItemsFromWsSet(null, [itemToRemove]));
    }

    dispatch(addItemsToWsSet(null, [itemToAdd]));
  }
};
