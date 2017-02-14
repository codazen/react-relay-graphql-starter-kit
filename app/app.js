/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { browserHistory, match, Router } from 'react-router';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import routes from './routes';

import './styles/styles.css';

const environment = new Relay.Environment();
// match network layer with server's isomorphic network layer
environment.injectNetworkLayer(new Relay.DefaultNetworkLayer('/graphql'));

const preloadedData: any = document.getElementById('preloadedData');
const data = JSON.parse(preloadedData.textContent);
IsomorphicRelay.injectPreparedData(environment, data);

match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
  IsomorphicRouter.prepareInitialRender(environment, renderProps).then((props) => {
    ReactDOM.render(<Router {...props} />, document.getElementById('root'));
  });
});
