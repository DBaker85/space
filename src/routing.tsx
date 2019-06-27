import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loader from './loader/loader';

const LazyWelcome = Loadable({
  loader: () => import('./welcome/welcome'),
  loading: () => <Loader />
});

class Routing extends Component {
  render() {
    return (
      <Switch>
        <Route path="/dude" render={() => <h1>To the best</h1>} />
        <Route path="/" component={LazyWelcome} />
      </Switch>
    );
  }
}

export default Routing;
