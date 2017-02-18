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

console.log(document.cookie); // eslint-disable-line

const getCookie = () => {
  const name = 'xsrf_token=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:8080/graphql', {
    credentials: 'include',
    headers: {
      'X-XSRF-TOKEN': getCookie(),
    },
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
