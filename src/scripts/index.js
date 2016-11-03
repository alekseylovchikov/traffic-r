import React        from 'react';
import { render }   from 'react-dom';

import * as files from './files';

import { Router, browserHistory } from 'react-router';
import routes from './routes';

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
);
