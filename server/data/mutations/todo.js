/* @flow */

import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} from 'graphql';

import {
  mutationWithClientMutationId,
  offsetToCursor,
  fromGlobalId,
} from 'graphql-relay';

import { UserType } from '../types/userType';
import { TodoEdge, TodoType } from '../types/todoType';
import {
  addTodo,
  removeTodo,
  updateTodo,
} from '../models/todoModel';
import {
  addTodoToUser,
  removeTodoFromUser,
} from '../models/userModel';

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
      resolve: async ({ todo, user }) => {
        const numTodos = user.todos.length;
        // Note on offsetToCursor
        // WARNING: 'cursorForObjectInConnection' returns null and causes
        // mutation to fail here b/c it uses indexOf. See:
        // <https://github.com/graphql/graphql-relay-js/issues/29>
        return {
          cursor: offsetToCursor(numTodos - 1),
          node: todo,
        };
      },
    },
    user: {
      type: UserType,
      resolve: ({ user }) => user,
    },
  },
  mutateAndGetPayload: async (source, context) => {
    const todo = await addTodo(source.content);
    const user = await addTodoToUser(context.user.userID, todo._id); // eslint-disable-line
    return {
      todo,
      user,
    };
  },
});

const removeTodoMutation = mutationWithClientMutationId({
  name: 'RemoveTodo',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    deletedTodoId: {
      type: GraphQLID,
      resolve: ({ id }) => id,
    },
    user: {
      type: UserType,
      resolve: ({ user }) => user,
    },
  },
  mutateAndGetPayload: async ({ id }, context) => {
    const localTodoID = fromGlobalId(id).id;
    await removeTodo(localTodoID);
    const user = await removeTodoFromUser(context.user.userID, localTodoID);
    return {
      id,
      user,
    };
  },
});

const updateTodoMutation = mutationWithClientMutationId({
  name: 'UpdateTodo',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    todo: {
      type: TodoType,
      resolve: ({ todo }) => todo,
    },
  },
  mutateAndGetPayload: async ({ id, content }) => {
    const localTodoId = fromGlobalId(id).id;
    const todo = await updateTodo(localTodoId, content);
    return {
      todo,
    };
  },
});

export default {
  addTodo: addTodoMutation,
  removeTodo: removeTodoMutation,
  updateTodo: updateTodoMutation,
};
