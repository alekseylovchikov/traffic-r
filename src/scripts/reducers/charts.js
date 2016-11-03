import update from 'react-addons-update';

import { showErrorToDeveloper } from '../helpers';

import * as types from '../constants';

const initialState = {};

const charts = (state = initialState, action) => {

  switch (action.type) {

    case types.ADD_CHARTS: {

      const newState = {};

      action.items.forEach((item) => {

        const id = ('g' + item.group + '_' + item.asset).replace('/', '-').toLowerCase();

        const split = item.asset.split('-');

        const symbol = split[0];
        const range  = +split[1];

        newState[id] = {
          asset            : symbol,
          symbol           : symbol,
          range            : range,
          type             : 'candles',

          data             : [],

          profitability    : item.profitability,
          availability     : item.availability,

          mood             : false,
          news             : false,
          tools            : false,
          interval         : 5,
          timeview         : null,
          hover            : null,

          eventsAreLoading : false,
          events           : [],

          amount           : 50,
          time             : null,

          countdown        : {
            minutes : '00',
            seconds : '00'
          },
          countdownId      : null,

          historyIsLoading : false,

          resize           : 0
        };
      });

      return Object.assign(newState, state);
    }

    case types.REMOVE_CHARTS:

      const existingState = {...state};

      action.items.forEach((item) => {

        const group = 'g' + item.group;

        const id = group + '_' + item.asset.replace('/', '-').toLowerCase();

        // Temporary
        // Check if we have active bets
        // if (state[id].bets.length === 0) {

          // Remove chart data if none active bets found
          // delete existingState[id];
        // }
      });

      return existingState;

    case types.REMOVE_COUNTDOWN: {

      const existingState = {...state};

      delete existingState[action.id];

      return existingState;
    }

    case types.UPDATE_CHART_DATA:

      const id = 'g0_' + (action.id).replace('/', '-').toLowerCase();

      // Fix for too early data update action
      if (!state[id]) {
        return state;
      }

      // Check if we need to add a new item to array or to update the last one
      if (state[id].data.length > 0 && action.data.right === state[id].data[state[id].data.length - 1].right) {

        let data = state[id].data.slice();

        data[data.length - 1].open  = action.data.open;
        data[data.length - 1].close = action.data.close;
        data[data.length - 1].low   = action.data.low;
        data[data.length - 1].high  = action.data.high;

        return update(state, {
          [id]: {
            data: {
              $set: data
            }
          }
        });

      } else {

        if (state[id].data.length > 0) {
          // Add previous value
          action.data.previous = state[id].data[state[id].data.length - 1].close;
        }

        return update(state, {
          [id]: {
            data: {
              $push: [action.data]
            }
          }
        });
      }

    case types.REQUEST_CHART_HISTORY_DATA:
      return update(state, {
        [action.id]: {
          historyIsLoading: {
            $set: true
          }
        }
      });

    case types.RECEIVE_CHART_HISTORY_DATA_SUCCESS:

      const data = action.data.concat(state[action.id].data);

      return update(state, {
        [action.id]: {
          data: {
            $set: data
          },
          historyIsLoading: {
            $set: false
          }
        }
      });

    case types.RECEIVE_CHART_HISTORY_DATA_ERROR:
      showErrorToDeveloper(action);
      return state;

    case types.MINIMIZE_SIDEBAR:
    case types.MAXIMIZE_SIDEBAR:

      for (let chart in state) {

        // Need to check if chart is active in the future
        return update(state, {
          [chart]: {
            resize: {
              $set: state[chart].resize + 1
            }
          }
        });
      }

    case types.TOGGLE_MOOD_INDICATOR:
      return update(state, {
        [action.id]: {
          mood: {
            $set: action.active
          }
        }
      });

    case types.TOGGLE_NEWS:
      return update(state, {
        [action.id]: {
          news: {
            $set: action.active
          }
        }
      });

    case types.TOGGLE_TOOLS:
      return update(state, {
        [action.id]: {
          tools: {
            $set: action.active
          }
        }
      });

    case types.SET_TIMEVIEW_STATE:
      return update(state, {
        [action.id]: {
          timeview: {
            $set: action.value
          }
        }
      });

    case types.SHOW_TRADE_GRADIENT:
      return update(state, {
        [action.id]: {
          gradient: {
            $set: action.button
          }
        }
      });

    case types.HIDE_TRADE_GRADIENT:
      return update(state, {
        [action.id]: {
          gradient: {
            $set: null
          }
        }
      });

    case types.SET_TRADE_AMOUNT:
      return update(state, {
        [action.id]: {
          amount: {
            $set: action.amount
          }
        }
      });

    case types.SET_TRADE_TIME:
      return update(state, {
        [action.id]: {
          time: {
            $set: action.time
          }
        }
      });

    case types.SET_COUNTDOWN_TIMER:
      return update(state, {
        [action.id]: {
          countdown: {
            $set: action.countdown
          },
          countdownId : {
            $set: action.countdownId
          }
        }
      });

    case types.FETCH_CHART_EVENTS_DATA_REQUEST:
      return update(state, {
        [action.id]: {
          eventsAreLoading: {
            $set: true
          }
        }
      });

    case types.FETCH_CHART_EVENTS_DATA_SUCCESS:

      // Load more
      if (action.more) {

        const events = (state[action.id].events).concat(action.events);

        return update(state, {
          [action.id]: {
            events: {
              $set: events
            }
          }
        });

      // Load first time
      } else {
        return update(state, {
          [action.id]: {
            events: {
              $set: action.events
            },
            eventsAreLoading: {
              $set: false
            }
          }
        });
      }

    case types.FETCH_CHART_EVENTS_DATA_FAILURE:
      showErrorToDeveloper(action);
      return state;

    default:
      return state;

  }
}

export default charts;
