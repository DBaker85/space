import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from '@apollo/react-hooks';
import { createApolloClient } from './apollo';

createApolloClient.then(client => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  );
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (process.env.NODE_ENV === 'production') {
  serviceWorker.register();
}

if (process.env.NODE_ENV === 'development') {
  serviceWorker.unregister();
}
