/* @flow */

import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { connectionDefinitions, globalIdField, connectionArgs, connectionFromArray } from 'graphql-relay';
import { nodeInterface } from '../nodes';
import { registerType } from '../typeRegistry';
import { UserModel, getUser, getTodosFromUser } from '../models/userModel';
import { TodoConnection } from './todoType';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user with todo list',
  fields: {
    id: globalIdField('User'),
    firstName: {
      type: GraphQLString,
      description: 'user\'s first name',
    },
    lastName: {
      type: GraphQLString,
      description: 'user\'s last name',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'user\'s unique email address',
    },
    todos: {
      type: TodoConnection,
      description: 'The todos for a user',
      args: connectionArgs,
      resolve: async (source, args, context, info) => { // eslint-disable-line
        const todos = await getTodosFromUser(context.user.userID);
        return connectionFromArray(todos, args);
      },
    },
  },
  interfaces: () => [nodeInterface],
});

const {
  connectionType: UserConnection,
  edgeType: UserEdge,
} = connectionDefinitions({ name: 'User', nodeType: UserType });

registerType(UserModel, UserType, getUser);

module.exports = { UserType, UserConnection, UserEdge };
