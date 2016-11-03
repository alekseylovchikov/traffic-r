import { createStore, applyMiddleware, compose } from 'redux';
import thunk                                     from 'redux-thunk';

import reducers from '../reducers';

import DevTools from '../containers/DevTools';

const middleware = [
  thunk
];

const enhancer = compose(
  applyMiddleware(...middleware),
  DevTools.instrument(),
);

const store = createStore(
  reducers,
  enhancer
);

if (module.hot) {
  module.hot.accept('../reducers', () =>
    store.replaceReducer(require('../reducers').default)
  );
}

export default store;
