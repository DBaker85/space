import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loader from './shared/loader/loader';

import Main from './main/main';

const LazyWelcome = Loadable({
  loader: () => import('./welcome/welcome'),
  loading: () => <Loader />
});

const Routing: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/main" component={Main} />
      <Route path="/" component={LazyWelcome} />
    </Switch>
  );
};

export default Routing;
