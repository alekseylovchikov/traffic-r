import { combineReducers } from 'redux';

import time       from './time';

import auth       from './auth';
import account    from './account';
import bonuses    from './bonuses';

import wallet     from './wallet';
import assets     from './assets';

import modals     from './modals';
import sidebar    from './sidebar';

import generator  from './generator';
import websockets from './websockets';

import groups     from './groups';
import charts     from './charts';
import bets       from './bets';

const reducers = combineReducers({
  time,

  auth,
  account,
  bonuses,

  wallet,
  assets,

  modals,
  sidebar,

  generator,
  websockets,

  groups,
  charts,
  bets
});

export default reducers;
