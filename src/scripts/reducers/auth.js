import * as types from '../constants';

import { showErrorToDeveloper, setCookie, deleteCookie } from '../helpers';

const initialState = {
  loading : false,
  error   : false
};

const auth = (state = initialState, action) => {
  switch (action.type) {

    case types.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.USER_LOGIN_SUCCESS:

      setCookie('accessToken', action.tokens.accessToken);

      if (action.tokens.refreshToken) {
        setCookie('refreshToken', action.tokens.refreshToken);
      }

      return {
        ...state,
        loading : false,
        error   : false
      };

    case types.USER_LOGIN_ERROR:

      showErrorToDeveloper(action);

      return {
        ...state,
        error: action.error
      };

    case types.USER_LOGOUT_SUCCESS:
    case types.USER_LOGOUT_FROM_ALL_DEVICES_SUCCESS:

      deleteCookie('accessToken');
      deleteCookie('refreshToken');

      function redirectAfterLogout() {
        window.location.href = LANDING_URL;
      };

      setTimeout(redirectAfterLogout, 250);

      return initialState;

    case types.USER_LOGOUT_FROM_ALL_DEVICES_ERROR:
      showErrorToDeveloper(action);
      return state;

    case types.USER_TOKEN_REFRESH_SUCCESS:

      setCookie('accessToken', action.tokens.accessToken);

      return state;

    case types.USER_TOKEN_REFRESH_FAILURE:
      showErrorToDeveloper(action);

      if (action.status === 401) {

        function redirectIfRefreshTokenIsExpired() {
          window.location.href = LANDING_URL;
        };

        setTimeout(redirectIfRefreshTokenIsExpired, 250);
      }

      return state;

    default:
      return state;
  }
}

export default auth;
