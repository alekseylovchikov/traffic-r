import React from 'react';
import { IndexRoute, Route } from 'react-router';
// components
import Clickaine from './components';
import ActivePage from './components/clickaine/ActivePage';
// components -> pages
import Publisher from './components/clickaine/publisher/Publisher';
import StatisticsPage from './components/clickaine/publisher/statistics/StatisticsPage';
import DashboardPage from './components/clickaine/publisher/dashboard/DashboardPage';
import NotFoundPage from './components/clickaine/404/NotFoundPage';

export default (
  <Route path="/" component={Clickaine}>
    <IndexRoute component={ActivePage} />
    <Route path="publisher" component={Publisher}>
      <Route path="sites/create" component={ActivePage} />
      <Route path="dashboard" component={DashboardPage} />
      <Route path="statistics" component={StatisticsPage} />
    </Route>
    <Route path="advertiser" component={NotFoundPage}>
      <Route path="" component={NotFoundPage} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
