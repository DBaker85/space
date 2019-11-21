import React, { FunctionComponent, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import styles from './app.module.scss';
import Routing from './routing';

const LazyStarfield = Loadable({
  loader: () => import('./starfield/starfield'),
  loading: () => null
});

const LazyNotifications = Loadable({
  loader: () => import('./shared/notifications/notifications'),
  loading: () => null
});

const LazyNetworkStatus = Loadable({
  loader: () => import('./shared/utils/network-status'),
  loading: () => null
});

const App: FunctionComponent = () => {
  return (
    <Fragment>
      <LazyStarfield />
      <LazyNotifications />
      <LazyNetworkStatus />
      <div className={styles.content}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </div>
    </Fragment>
  );
};

export default App;
