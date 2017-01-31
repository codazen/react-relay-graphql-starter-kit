/* @flow */

import { GraphQLString, GraphQLObjectType } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { nodeInterface } from '../nodes';
import { registerType } from '../typeRegistry';
import {
  todosById,
  getTodo,
} from '../database';


const todoType = new GraphQLObjectType({
  name: 'Todo',
  description: 'A todo item',
  fields: {
    id: globalIdField('Todo'),
    content: {
      type: GraphQLString,
      description: 'The content of the todo item',
    },
  },
  interfaces: () => [nodeInterface],
});

const {
  connectionType: todoConnection,
  edgeType: TodoEdge,
} = connectionDefinitions({name: 'Todo', nodeType: todoType});

registerType(todosById, todoType, getTodo);

module.exports = { todoType, todoConnection, TodoEdge };
