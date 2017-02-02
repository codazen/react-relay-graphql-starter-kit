/* @flow */

import { GraphQLObjectType } from 'graphql';
import { connectionDefinitions, globalIdField, connectionArgs, connectionFromArray } from 'graphql-relay';
import { nodeInterface } from '../nodes';
import { registerType } from '../typeRegistry';
import { getTodos, usersById, getUser } from '../database';
import { TodoConnection } from './todoType';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user with todo list',
  fields: {
    id: globalIdField('User'),
    todos: {
      type: TodoConnection,
      description: 'The todos for a user',
      args: connectionArgs,
      resolve: async (source, args, context, info) => // eslint-disable-line
        connectionFromArray(getTodos(), args),
    },
  },
  interfaces: () => [nodeInterface],
});

const {
  connectionType: UserConnection,
  edgeType: UserEdge,
} = connectionDefinitions({ name: 'User', nodeType: UserType });

registerType(usersById, UserType, getUser);

module.exports = { UserType, UserConnection, UserEdge };
