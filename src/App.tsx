import React, { FunctionComponent, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import styles from './app.module.scss';
import Routing from './routing';

const LazyStarfield = Loadable({
  loader: () => import('./starfield/starfield'),
  loading: () => null
});

const LazyNetworkStatus = Loadable({
  loader: () => import('./shared/network-status/network-status'),
  loading: () => null
});

const LazyHelperBot = Loadable({
  loader: () => import('./helper-bot/helper-bot'),
  loading: () => null
});

const App: FunctionComponent = () => {
  return (
    <Fragment>
      <LazyStarfield />
      <LazyNetworkStatus />
      <div className={styles.content}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </div>
      <LazyHelperBot />
    </Fragment>
  );
};

export default App;
