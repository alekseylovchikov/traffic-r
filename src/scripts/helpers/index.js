import axios from 'axios';

import api from '../../../config/api';

import { userTokenRefreshSuccess, userTokenRefreshFailure } from '../actions/auth';

// Show error message to developer
export function showErrorToDeveloper(response) {

  // Show errors from backend
  if (response.data) {
    if (response.data.message) {
      console.error('Backend error:', response.status, 'Code:', response.data.error, response.data.message);
    } else {
      console.error('Backend error:', response.status, response.data);
    }
  }

  // Show errors from frontend
  if (response.message) {
    console.error('Frontend error:', response.message);
  }
};

// Get cookie by name
export function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

// Set cookie by name
export function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == 'number' && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + '=' + value;

  for (var propName in options) {
    updatedCookie += '; ' + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }

  document.cookie = updatedCookie;
};

// Delete cookie by name
export function deleteCookie(name) {
  setCookie(name, '', {
    path: '/',
    expires: -1
  });
};

export function request(dispatch, options) {

  const req = () => {

    options = {
      request : options.request || false,
      success : options.success || false,
      failure : options.failure || false,
      trigger : options.trigger || false,
      lazy    : options.lazy    || false,

      auth    : options.auth || true,

      url     : options.url || false,
      method  : options.method || 'GET',
      id      : options.id || false,
      params  : options.params || {},
      data    : options.data || {}
    };

    // Dispatch request action
    if (options.request) {
      if (!options.id) {
        dispatch(options.request(options.lazy));
      } else {
        dispatch(options.request(options.id, options.lazy));
      }
    }

    // Add headers
    const headers = {
      'Content-Type': 'application/json'
    };

    if (options.auth === true) {
      const accessToken = getCookie('accessToken');
      headers['Authorization'] = 'Bearer ' + accessToken;
    }

    if (options.auth === 'refresh') {
      const refreshToken = getCookie('refreshToken');
      headers['Refresh-Token'] = refreshToken;
    }

    // Run axios query
    if (options.url) {

      return axios({
        url     : options.url,
        method  : options.method,
        headers : headers,
        params  : options.params,
        data    : options.data
      })
        .then((response) => {
          if (options.success) {

            if (!options.id) {
              dispatch(options.success(response.data, options.lazy));
            } else {
              dispatch(options.success(options.id, response.data, options.lazy));
            }

            // Dispatch multiple or one triggered actions
            if (options.trigger) {
              if (Array.isArray(options.trigger)) {
                options.trigger.forEach((action) => {
                  dispatch(action());
                });
              } else {
                dispatch(options.trigger());
              }
            }
          }
        })
        .catch((response) => {
          if (options.failure) {
            dispatch(options.failure(response.status, response.data));

            // If access token is invalid
            if (response.status === 401) {
              const refreshToken = getCookie('refreshToken');

              return axios({
                url     : api.USER_REFRESH_TOKEN,
                headers : {
                  'Refresh-Token': refreshToken
                }
              })
                .then((response) => {
                  dispatch(userTokenRefreshSuccess(response.data));

                  // Retry request with new access token
                  setTimeout(req, 100);
                })
                .catch((response) => {
                  dispatch(userTokenRefreshFailure(response.status, response.data));
                });
            }
          }
        });
    }
  }

  return req();
};
