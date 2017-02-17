/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { browserHistory, Router, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import Axios from 'axios';
import routes from './routes';
import './styles/styles.css';

Axios.post('http://localhost:8080/authenticate',
          { email: 'testuser@test.com', password: 'password' },
          { withCredentials: true });

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:8080/graphql', {
    credentials: 'include',
  }),
);

ReactDOM.render(
  <Router
    environment={Relay.Store}
    history={browserHistory}
    routes={routes}
    render={applyRouterMiddleware(useRelay)}
  />,
  document.getElementById('root'),
);
