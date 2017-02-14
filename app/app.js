import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { browserHistory, match, Router } from 'react-router';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';

import './styles/styles.css';

const environment = new Relay.Environment();
// match network layer with server's isomorphic network layer
environment.injectNetworkLayer(new Relay.DefaultNetworkLayer('/graphql'));

const preloadedData: any = document.getElementById('preloadedData');
const data = JSON.parse(preloadedData.textContent);
IsomorphicRelay.injectPreparedData(environment, data);

const rootNode = document.getElementById('root');

const renderApp = () => {
  // must require routes like this here in order for hmr to work
  const routes = require('./routes').default;  // eslint-disable-line global-require

  match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
    IsomorphicRouter.prepareInitialRender(environment, renderProps).then((props) => {
      ReactDOM.render(<Router {...props} />, rootNode);
    });
  });
};

// initial render
renderApp();

// if hot module replacement is running, re-render accordingly
if (module.hot) {
  module.hot.accept('./routes', () => {
    ReactDOM.unmountComponentAtNode(rootNode);
    renderApp();
  });
}
