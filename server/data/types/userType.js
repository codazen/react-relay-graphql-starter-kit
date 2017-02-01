/* @flow */

import { GraphQLObjectType } from 'graphql';
import { connectionDefinitions, globalIdField, connectionArgs, connectionFromArray } from 'graphql-relay';
import { nodeInterface } from '../nodes';
import { registerType } from '../typeRegistry';
import { getTodos, usersById, getUser } from '../database';
import { todoConnection } from './todoType';

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user with todo list',
  fields: {
    id: globalIdField('User'),
    todos: {
      type: todoConnection,
      description: 'The todos for a user',
      args: connectionArgs,
      resolve: async (source, args, context, info) => // eslint-disable-line
        connectionFromArray(getTodos(), args),
    },
  },
  interfaces: () => [nodeInterface],
});

const {
  connectionType: userConnection,
  edgeType: UserEdge,
} = connectionDefinitions({ name: 'User', nodeType: userType });

registerType(usersById, userType, getUser);

module.exports = { userType, userConnection, UserEdge };
