/* @flow */

import { GraphQLString, GraphQLObjectType } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { nodeInterface } from '../nodes';
import { registerType } from '../typeRegistry';
import {
  getTodo,
  TodoModel,
} from '../models/todoModel';

const TodoType = new GraphQLObjectType({
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
  connectionType: TodoConnection,
  edgeType: TodoEdge,
} = connectionDefinitions({ name: 'Todo', nodeType: TodoType });

registerType(TodoModel, TodoType, getTodo);

module.exports = { TodoType, TodoConnection, TodoEdge };
