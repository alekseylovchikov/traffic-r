import api from '../../../config/api';
import * as types from '../constants';

import { request } from '../helpers';

import { fetchUserWalletData  } from './wallet';

export const handleSidebarTabClick = (selected) => {
  return {
    type: types.SWITCH_SIDEBAR,
    selected
  }
};

function requestData() {
  return {
    type: types.REQUEST_SIDEBAR_DATA
  }
};

function fetchNewsDataRequest(more) {
  return {
    type: types.FETCH_NEWS_DATA_REQUEST,
    more
  }
};

function fetchNewsDataSuccess(news, more) {
  return {
    type: types.FETCH_NEWS_DATA_SUCCESS,
    news, more
  }
};

function fetchNewsDataFailure(status, data) {
  return {
    type: types.FETCH_NEWS_DATA_FAILURE,
    status, data
  }
};

export const fetchNewsData = (page = 1) => {
  return (dispatch) => {

    const lazy = (page === 1) ? false : true;

    return request(dispatch, {
      request : fetchNewsDataRequest,
      success : fetchNewsDataSuccess,
      failure : fetchNewsDataFailure,
      lazy    : lazy,
      url     : api.GET_NEWS_DATA
    });
  }
};
