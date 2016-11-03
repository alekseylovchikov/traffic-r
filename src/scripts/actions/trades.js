import api from '../../../config/api';
import * as types from '../constants';

import { request } from '../helpers';

import { addBet, checkBets } from './bets';

export const setTradeAmount = (id, amount) => {
  return {
    type: types.SET_TRADE_AMOUNT,
    id, amount
  }
};

export const setTradeTime = (id, time) => {
  return (dispatch, getState) => {

    const chart = getState().charts[id];

    let countdownId = chart.countdownId;

    const asset = chart.asset;

    dispatch({
      type: types.SET_TRADE_TIME,
      id, time
    });

    // Clear existing interval if there's one
    if (countdownId) {
      clearInterval(countdownId)
    }

    // Set new interval
    countdownId = setInterval(() => {

      // Current platform time
      const now = getState().time.time;

      const diff = Math.floor((time - new Date(now))/1000);

      let minutes = Math.floor(diff/60);
      let seconds = diff - minutes * 60;

      minutes = (minutes > 0) ? ('0' + minutes) : '00';
      seconds = (seconds < 10) ? ('0' + seconds) : seconds;

      const countdown = {
        minutes: minutes,
        seconds: seconds
      };

      dispatch({
        type: types.SET_COUNTDOWN_TIMER,
        id, countdown, countdownId
      });

    }, 1000);

    // Current time
    const now = getState().time.time;

    // Add one second delay for checking bets
    const checkDelay = time - new Date(now);

    setTimeout(() => {
      dispatch(checkBets(asset));
    }, checkDelay);
  }
};

export const handleTradeButtonHover = (id, button) => {
  return {
    type: types.SHOW_TRADE_GRADIENT,
    id, button
  }
};

export const handleTradeButtonLeave = (id) => {
  return {
    type: types.HIDE_TRADE_GRADIENT,
    id
  }
};

export const handleTradeButtonClick = (options) => {

  const asset = options.asset.split('-')[0];
  const isUp  = (options.type === 'call') ? true : false;

  const data = {
    asset       : asset,
    duration    : 60000,
    isUp        : isUp,
    bet         : options.amount,
    optionType  : 'turbo'
  };

  return (dispatch, getState) => {

    let enoughMoney = false;

    const wallet = getState().wallet.data;

    // Get currently active balance
    const activeBalances = wallet.balances.filter((balance) => {
      return balance.balanceType === wallet.activeBalance;
    });

    const activeBalance = activeBalances[0];

    // Set bet balance type
    data.balanceType = activeBalance.balanceType;

    // Check if wallet has enough money
    if (activeBalance.balanceType === 'demo') {

      // Check only bonus part of balance
      if (activeBalance.bonus - options.amount > 0) {
        enoughMoney = true;
      }

    } else if (activeBalance.balanceType === 'real') {

      // Check both parts of balance
      const bonusRatio = (activeBalance.bonus / (activeBalance.real + activeBalance.bonus)).toFixed(2);
      const realRatio  = 1 - bonusRatio;

      const fromBonus = bonusRatio * options.amount;
      const fromReal  = realRatio  * options.amount;

      if (activeBalance.bonus - fromBonus > 0 && activeBalance.real - fromReal > 0) {
        enoughMoney = true;
      }

    }

    dispatch(addBet(options.id, data, enoughMoney));
  }
};

