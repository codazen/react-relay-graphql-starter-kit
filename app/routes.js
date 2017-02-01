/* @flow */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import TodoApp from './containers/TodoApp';
import userQuery from './queries/userQuery';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={TodoApp} queries={userQuery} />
  </Route>
);
