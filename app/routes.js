/* @flow */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App/App';
import TodoApp from './containers/TodoApp/TodoApp';
import userQuery from './queries/userQuery';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={TodoApp} queries={userQuery} />
    <Route path="/login" component={App} />
  </Route>
);
