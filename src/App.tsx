import React, { FunctionComponent, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import NetworkDetector from './shared/network-detector/network-detector';

import styles from './app.module.scss';
import Routing from './routing';

const LazyStarfield = Loadable({
  loader: () => import('./starfield/starfield'),
  loading: () => null
});

const App: FunctionComponent = () => {
  return (
    <Fragment>
      <LazyStarfield />
      <div className={styles.content}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </div>
      <NetworkDetector />
    </Fragment>
  );
};

export default App;
