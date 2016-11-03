import api from '../../../config/api';
import * as types from '../constants';

import { request } from '../helpers';

import { addItemsToWsSet, removeItemsFromWsSet } from './websockets';

function requestChartHistoryData(id) {
  return {
    type: types.REQUEST_CHART_HISTORY_DATA,
    id
  }
};

function receiveChartHistoryDataSuccess(id, json) {
  return {
    type: types.RECEIVE_CHART_HISTORY_DATA_SUCCESS,
    id,
    data: json
  }
};

function receiveChartHistoryDataError(status, data) {
  return {
    type: types.RECEIVE_CHART_HISTORY_DATA_ERROR,
    status, data
  }
};

function fetchChartEventsDataRequest(id) {
  return {
    type: types.FETCH_CHART_EVENTS_DATA_REQUEST,
    id
  }
};

function fetchChartEventsDataSuccess(id, events) {
  return {
    type: types.FETCH_CHART_EVENTS_DATA_SUCCESS,
    id, events
  }
};

function fetchChartEventsDataFailure(id, status, data) {
  return {
    type: types.FETCH_CHART_EVENTS_DATA_FAILURE,
    id, status, data
  }
};

export const removeCountdownData = (id) => {
  return {
    type: types.REMOVE_COUNTDOWN,
    id
  }
};

export const handleMoodIndicatorState = (id, active) => {
  return {
    type: types.TOGGLE_MOOD_INDICATOR,
    id,
    active: !active
  }
};

export const handleNewsState = (id, active) => {
  return {
    type: types.TOGGLE_NEWS,
    id,
    active: !active
  }
};

export const handleToolsState = (id, active) => {
  return {
    type: types.TOGGLE_TOOLS,
    id,
    active: !active
  }
};

export const handleTimeviewState = (id, value) => {
  return {
    type: types.SET_TIMEVIEW_STATE,
    id, value
  }
};

export const fetchChartEventsData = (id, currency, date) => {
  return (dispatch, getState) => {

    const lazy = (date) ? true : false;

    const currencies = currency.split('/');

    let dateFrom, dateTo;

    if (!date) {

      // Current platform time
      const now = getState().time.time;

      const today = new Date(now);

      dateFrom = today.toISOString().substr(0, 11) + '00:00:00';
      dateTo   = today.toISOString().substr(0, 19);
    }

    return request(dispatch, {
      request : fetchChartEventsDataRequest,
      success : fetchChartEventsDataSuccess,
      failure : fetchChartEventsDataFailure,
      url     : api.GET_EVENTS_DATA,
      id      : id,
      params: {
        currency  : currencies,
        date_from : dateFrom,
        date_to   : dateTo
      }
    });
  }
};

export const fetchChartHistoryData = (id, symbol, range, period, time) => {
  return (dispatch) => {
    return request(dispatch, {
      request : requestChartHistoryData,
      success : receiveChartHistoryDataSuccess,
      failure : receiveChartHistoryDataError,
      url     : api.DATA_GET_HISTORY,
      id      : id,
      params  : {
        symbol : symbol,
        range  : range,
        period : period,
        time   : time
      }
    });
  }
};

export const changeAssetRange = (asset, currentRange, newRange) => {
  return (dispatch) => {

    const itemToRemove = {
      asset : asset + '-' + currentRange,
      group : 0
    };

    const itemToAdd = {
      asset : asset + '-' + newRange,
      group : 0
    };

    dispatch(removeItemsFromWsSet(null, [itemToRemove]));
    dispatch(addItemsToWsSet(null, [itemToAdd]));
  }
};
