import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import { idleCallback } from './shared/utils/idleCallback';
import { withRouteTracker } from './shared/analytics/analytics';
import Loader from './shared/loader/loader';

const LazyWelcome = Loadable({
  loader: () => import('./welcome/welcome'),
  loading: () => <Loader />
});
const LazyMain = Loadable({
  loader: () => import('./main/main'),
  loading: () => <Loader />
});
const LazyNotFound = Loadable({
  loader: () => import('./notFoundPage/notFoundPage'),
  loading: () => <Loader />
});

// TODO: Fix any statement below
const Routing: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/main" component={withRouteTracker(LazyMain as any)} />
      <Route
        path="/"
        exact
        render={routeProps => {
          idleCallback(() => LazyMain.preload());
          const TrackedLazyWelcome = withRouteTracker(LazyWelcome);
          return <TrackedLazyWelcome {...routeProps} />;
        }}
      />
      <Route path="*" component={withRouteTracker(LazyNotFound as any)} />
    </Switch>
  );
};

export default Routing;
