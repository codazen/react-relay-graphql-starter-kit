/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { browserHistory, Router, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import routes from './routes';

ReactDOM.render(
  <Router
    environment={Relay.Store}
    history={browserHistory}
    routes={routes}
    render={applyRouterMiddleware(useRelay)}
  />,
  document.getElementById('root'), // eslint-disable-line no-undef
);
