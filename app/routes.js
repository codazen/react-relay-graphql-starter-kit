/* @flow */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import TodoApp from './containers/TodoApp';

export default (
  <Route path='/' component={App}>
    <IndexRoute
      component={TodoApp}
    />
  </Route>
);
