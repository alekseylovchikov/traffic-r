import { showErrorToDeveloper } from '../helpers';

import * as types from '../constants';

const initialState = {
  isLoading     : false,
  isLoadingMore : false,

  minimized     : true,
  selected      : -1,

  news          : [],
  deals         : []
};

const sidebar = (state = initialState, action) => {
  switch (action.type) {

    case types.SWITCH_SIDEBAR:

      if (state.selected === action.selected) {

        return {
          ...state,
          minimized : true,
          selected  : -1
        };

      } else {

        return {
          ...state,
          minimized : false,
          selected  : action.selected
        };

      }

    case types.REQUEST_SIDEBAR_DATA:
      return {
        ...state,
        isLoading: true
      };

    case types.FETCH_NEWS_DATA_REQUEST:

      // Load more
      if (action.more) {
        return {
          ...state,
          isLoadingMore: true
        }

      // Load first time
      } else {
        return {
          ...state,
          isLoading: true
        };
      }

    case types.FETCH_NEWS_DATA_SUCCESS:

      // Load more
      if (action.more) {

        const news = (state.news).concat(action.news);

        return {
          ...state,
          isLoadingMore: false,
          news: news
        };

      // Load first time
      } else {
        return {
          ...state,
          isLoading: false,
          news: action.news
        };
      }

    case types.FETCH_NEWS_DATA_FAILURE:
      showErrorToDeveloper(action);
      return state;

    default:
      return state;
  }
}

export default sidebar;
