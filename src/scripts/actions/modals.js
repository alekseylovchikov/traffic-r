import * as types from '../constants';

export const showModal = (name) => {
  return {
    type: types.SHOW_MODAL,
    name
  }
};

export const hideModal = (name) => {
  return {
    type: types.HIDE_MODAL,
    name
  }
};

export const redirectModal = (url) => {
  return {
    type: types.REDIRECT_MODAL,
    url
  }
};
