import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { makeExecutableSchema, addMockFunctionsToSchema, MockList } from 'graphql-tools';
import { graphql } from 'graphql';
import casual from 'casual';
import schemaString from 'data/schema.graphql';
import { TodoItem } from '../TodoItem';
import RemoveTodoMutation from '../../mutations/RemoveTodoMutation';
import UpdateTodoMutation from '../../mutations/UpdateTodoMutation';

// use consistent seed for snapshot matching
casual.seed(123);

// create schema based on server/data/schema.graphql
const schema = makeExecutableSchema({ typeDefs: schemaString });

// mock data
const numListItems = 10;
const mocks = {
  TodoConnection: () => ({
    edges: () => new MockList(numListItems),
  }),
  Todo: () => ({
    id: () => casual.integer(0, 1000).toString(),
    content: () => casual.string,
  }),
};

// add mocks to schema in place
addMockFunctionsToSchema({
  schema,
  mocks,
});

describe('TodoItem component', () => {
  let todoItem;
  let todo;
  let user;
  const query = `query
    TodoItem {
      user {
        id
        todos(first: 10) {
          edges {
            node {
              id
              content
            }
          }
        }
      }
    }
  `;

  // mock mutation calls and use _unresolvedProps to detect failure
  const RemoveTodoStatus = jest.fn(mutation => mutation._unresolvedProps.id); // eslint-disable-line
  const UpdateTodoStatus = jest.fn(mutation => mutation._unresolvedProps.content); // eslint-disable-line
  const mockSuccessFn = jest.fn((onSuccess, transaction) => onSuccess(transaction));
  const mockFailureFn = jest.fn((onFailure, transaction) => onFailure(transaction));

  const relay = {
    commitUpdate: jest.fn((mutation, callbacks) => {
      if (mutation instanceof RemoveTodoMutation) {
        return RemoveTodoStatus(mutation)
          ? mockSuccessFn(callbacks ? callbacks.onSuccess : () => {}, {})
          : mockFailureFn(callbacks ? callbacks.onFailure : () => {}, {});
      } else if (mutation instanceof UpdateTodoMutation) {
        return UpdateTodoStatus(mutation)
          ? mockSuccessFn(callbacks ? callbacks.onSuccess : () => {}, {})
          : mockFailureFn(callbacks ? callbacks.onFailure : () => {}, {});
      }
      return {};
    }),
  };

  beforeEach(async () => {
    await graphql(schema, query).then((result) => {
      todo = result.data.user.todos.edges[0].node;
      user = result.data.user;
      todoItem = shallow(<TodoItem todo={todo} user={user} relay={relay} />);
      RemoveTodoStatus.mockClear();
      UpdateTodoStatus.mockClear();
      mockSuccessFn.mockClear();
      mockFailureFn.mockClear();
    });
  });

  it('Renders correctly', () => {
    expect(shallowToJson(todoItem)).toMatchSnapshot();
  });

  describe('Unit test: handleRemoveTodo', () => {
    it('Success', () => {
      const id = todoItem.instance().props.todo.id;
      todoItem.instance().handleRemoveTodo(id);
      expect(todoItem.instance().props.relay.commitUpdate).toHaveBeenCalled();
      expect(RemoveTodoStatus).toHaveBeenCalled();
      expect(mockSuccessFn).toHaveBeenCalled();
    });

    it('Fails', () => {
      const id = undefined;
      todoItem.instance().handleRemoveTodo(id);
      expect(todoItem.instance().props.relay.commitUpdate).toHaveBeenCalled();
      expect(RemoveTodoStatus).toHaveBeenCalled();
      expect(mockFailureFn).toHaveBeenCalled();
    });
  });

  describe('Unit test: handleUpdateTodo', () => {
    it('Success', () => {
      const todoUpdate = todoItem.instance().props.todo;
      todoItem.instance().handleUpdateTodo(todoUpdate);
      expect(todoItem.instance().props.relay.commitUpdate).toHaveBeenCalled();
      expect(UpdateTodoStatus).toHaveBeenCalled();
      expect(mockSuccessFn).toHaveBeenCalled();
    });

    it('Fails', () => {
      const todoUpdate = todoItem.instance().props.todo;
      todoUpdate.content = undefined;
      todoItem.instance().handleUpdateTodo(todoUpdate);
      expect(todoItem.instance().props.relay.commitUpdate).toHaveBeenCalled();
      expect(UpdateTodoStatus).toHaveBeenCalled();
      expect(mockFailureFn).toHaveBeenCalled();
    });
  });
});
