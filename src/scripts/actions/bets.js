import api         from '../../../config/api';
import * as types  from '../constants';
import { request } from '../helpers';

import { updateWalletBalance, fetchUserWalletData } from './wallet';

const fetchBetsRequest = () => {
  return {
    type: types.FETCH_BETS_REQUEST
  }
};

const fetchBetsSuccess = (bets) => {
  return {
    type: types.FETCH_BETS_SUCCESS,
    bets
  }
};

const fetchBetsFailure = (status, data) => {
  return {
    type: types.FETCH_BETS_FAILURE,
    status, data
  }
};

const addBetFrontendSuccess = (id, data) => {
  return {
    type: types.ADD_BET_FRONTEND_SUCCESS,
    id, data
  }
};

const addBetFrontendFailure = () => {
  return {
    type: types.ADD_BET_FRONTEND_FAILURE,
    message: 'User doesn\'t have enough money'
  }
};

const addBetBackendSuccess = (id, data) => {
  return {
    type: types.ADD_BET_BACKEND_SUCCESS,
    id, data
  }
};

const addBetBackendFailure = (status, data) => {
  return {
    type: types.ADD_BET_BACKEND_FAILURE,
    status, data
  }
};

const closeBetFrontendSuccess = (bet) => {
  return {
    type: types.CLOSE_BET_FRONTEND_SUCCESS,
    bet
  }
};

const checkBetsFrontendSuccess = () => {
  return {
    type: types.CHECK_BETS_FRONTEND_SUCCESS
  }
};

const checkBetsBackendSuccess = (data) => {
  return (dispatch, getState) => {

    const opened = [];
    const closed = [];

    data.forEach((bet) => {
      if (bet.state === 'closed') {
        closed.push(bet);
      } else {
        opened.push(bet.id);
      }
    });

    // Retry checking if we still have opened bets
    if (opened.length > 0) {
      dispatch(checkBetsByIds(opened));
    }

    dispatch({
      type: types.CHECK_BETS_BACKEND_SUCCESS,
      bets: closed
    });
  }
};

const checkBetsBackendFailure = (status, data) => {
  return {
    type: types.CHECK_BETS_BACKEND_FAILURE,
    status, data
  }
};

export const fetchBets = () => {
  return (dispatch, getState) => {

    const activeBalance = getState().wallet.data.activeBalance;

    return request(dispatch, {
      request : fetchBetsRequest,
      success : fetchBetsSuccess,
      failure : fetchBetsFailure,
      url     : api.GET_BETS,
      params: {
        balance : activeBalance
      }
    });
  }
};

export const addBet = (id, data, enoughMoney) => {
  return (dispatch) => {
    if (enoughMoney) {
      // dispatch(addBetFrontendSuccess(id, data));
      // dispatch(updateWalletBalance(-data.bet));

      return request(dispatch, {
        success : addBetBackendSuccess,
        failure : addBetBackendFailure,
        trigger : updateWalletBalance.bind(null, -data.bet),
        url     : api.SET_BET,
        method  : 'post',
        id      : id,
        data    : data
      });

    } else {
      dispatch(addBetFrontendFailure());
    }
  }
};

export const checkBets = (asset) => {
  return (dispatch, getState) => {

    const bets = getState().bets[asset].opened || [];

    if (bets.length === 0) {
      return;
    }

    // const charts = getState().charts;

    // let closingRate;

    // for (let key in charts) {

    //   const chart = charts[key];

    //   if (chart.asset === asset) {
    //     closingRate = chart.data[chart.data.length - 1].close;
    //   }
    // }

    // const ids = [];

    // bets.forEach((bet) => {

    //   // Close bet if it's closing time <= current time
    //   if (new Date(bet.closingTime) <= time) {

    //     ids.push(bet.id);

    //     switch (bet.isUp) {
    //       case true:
    //         bet.result = (bet.openingRate <= closingRate) ? (bet.bet * bet.profitability / 100) : (-bet.bet);
    //         break;

    //       case false:
    //         bet.result = (bet.openingRate >= closingRate) ? (bet.bet * bet.profitability / 100) : (-bet.bet);
    //         break;
    //     }

    //     dispatch(closeBetFrontendSuccess(bet));

    //     if (bet.result > 0) {
    //       dispatch(updateWalletBalance(bet.bet + bet.result));
    //     }
    //   }
    // });

    function backend() {

      // Temporary: one second delay
      const now = getState().time.time - 4000;

      const ids = bets.map((bet) => {
        if (bet.closingTime <= now) {
          return bet.id;
        }
      });

      return request(dispatch, {
        success : checkBetsBackendSuccess,
        failure : checkBetsBackendFailure,
        trigger : fetchUserWalletData,
        url     : api.CHECK_BETS,
        params  : {
          id: ids,
        }
      });
    }

    setTimeout(backend, 5000);

    // dispatch(checkBetsFrontendSuccess());
  }
};

export const checkBetsByIds = (ids) => {
  return (dispatch) => {
    return request(dispatch, {
      success : checkBetsBackendSuccess,
      failure : checkBetsBackendFailure,
      trigger : fetchUserWalletData,
      url     : api.CHECK_BETS,
      params  : {
        id: ids,
      }
    });
  }
}
