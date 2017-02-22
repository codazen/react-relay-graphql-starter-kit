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
      resolve: source => source._doc.firstName, // eslint-disable-line
    },
    lastName: {
      type: GraphQLString,
      description: 'user\'s last name',
      resolve: source => source._doc.lastName, // eslint-disable-line
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'user\'s unique email address',
      resolve: source => source._doc.email, // eslint-disable-line
    },
    todos: {
      type: TodoConnection,
      description: 'The todos for a user',
      args: connectionArgs,
      resolve: async (source, args, context, info) => { // eslint-disable-line
        const todos = await getTodosFromUser(source._doc._id); // eslint-disable-line
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
