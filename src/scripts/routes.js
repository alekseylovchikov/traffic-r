import React from 'react';
import { IndexRoute, Route } from 'react-router';
// components
import Clickaine from './components';
import ActivePage from './components/clickaine/ActivePage';
// components -> pages
import Publisher from './components/clickaine/publisher/Publisher';
import StatisticsPage from './components/clickaine/publisher/statistics/StatisticsPage';
import DashboardPage from './components/clickaine/publisher/dashboard/DashboardPage';
import NewSitePage from './components/clickaine/publisher/sites/NewSitePage';
import SitesPage from './components/clickaine/publisher/sites/SitesPage';
import NotFoundPage from './components/clickaine/404/NotFoundPage';

export default (
  <Route path="/" component={Clickaine}>
    <IndexRoute component={ActivePage} />
    <Route path="publisher" component={Publisher}>
      <IndexRoute component={DashboardPage} />
      <Route path="dashboard" component={DashboardPage} />
      <Route path="sites" component={Publisher}>
        <IndexRoute component={SitesPage} />
        <Route path="create" component={NewSitePage} />
      </Route>
      <Route path="statistics" component={StatisticsPage} />
    </Route>
    <Route path="advertiser" component={NotFoundPage}>
      <Route path="" component={NotFoundPage} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
