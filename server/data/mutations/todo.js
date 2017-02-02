/* @flow */

import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId,
  offsetToCursor,
} from 'graphql-relay';

import { userType } from '../types/userType';
import { TodoEdge } from '../types/todoType';
import { addTodo, getTodo, getNumTodos, getViewer } from '../database';

const addTodoMutation = mutationWithClientMutationId({
  name: 'AddTodo',
  inputFields: {
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    newTodoEdge: {
      type: TodoEdge,
      resolve: async ({ localTodoId }) => {
        const todo = await getTodo(localTodoId);
        const numTodos = await getNumTodos();
        return {
          cursor: offsetToCursor(numTodos - 1),
          node: todo,
        };
      },
    },
    user: {
      type: userType,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: async ({ content }) => {
    const localTodoId = await addTodo(content);
    return {
      localTodoId,
    };
  },
});

export default {
  addTodo: addTodoMutation,
};
