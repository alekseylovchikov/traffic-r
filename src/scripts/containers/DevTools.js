import React from 'react';
import { createDevTools } from 'redux-devtools';

import FilterMonitor from 'redux-devtools-filter-actions';
import DockMonitor   from 'redux-devtools-dock-monitor';
import LogMonitor    from 'redux-devtools-log-monitor';
import Inspector     from 'redux-devtools-inspector';

import * as actions from '../constants';

const blacklist = [
  actions.UPDATE_TIME,
  actions.UPDATE_CHART_DATA,
  actions.SET_COUNTDOWN_TIMER
];

const DevTools = createDevTools(
  <FilterMonitor
    blacklist={blacklist}
  >
    <DockMonitor
      toggleVisibilityKey="ctrl-h"
      changePositionKey="ctrl-q"
      changeMonitorKey="ctrl-m"
      defaultIsVisible={false}
    >
      <Inspector />
      <LogMonitor theme="nicinabox" />
    </DockMonitor>
  </FilterMonitor>
);

export default DevTools;
