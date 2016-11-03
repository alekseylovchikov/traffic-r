import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const middleware = [
  thunk
];

const enhancer = applyMiddleware(...middleware);

const store = createStore(
  reducers,
  enhancer
);

export default store;
