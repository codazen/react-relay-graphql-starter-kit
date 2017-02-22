import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { makeExecutableSchema, addMockFunctionsToSchema, MockList } from 'graphql-tools';
import { graphql } from 'graphql';
import casual from 'casual';
import schemaString from 'data/schema.graphql';
import { TodoApp } from '../TodoApp';
import AddTodoMutation from '../mutations/AddTodoMutation';

// use consistent seed for snapshot matching
casual.seed(123);

// create schema based on server/data/schema.graphql
const schema = makeExecutableSchema({ typeDefs: schemaString });

// mock data
const numListItems = 10;
const mocks = {
  User: () => ({
    id: () => casual.integer(0, 1000).toString(),
  }),
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

describe('TodoApp component', () => {
  let todoApp;
  let user;
  const query = `query
    TodoApp {
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
  const AddTodoStatus = jest.fn(mutation => mutation._unresolvedProps.content); // eslint-disable-line
  const mockSuccessFn = jest.fn((onSuccess, transaction) => onSuccess(transaction));
  const mockFailureFn = jest.fn((onFailure, transaction) => onFailure(transaction));

  const relay = {
    commitUpdate: jest.fn((mutation) => {
      if (mutation instanceof AddTodoMutation) {
        return AddTodoStatus(mutation)
          ? mockSuccessFn(() => {}, {})
          : mockFailureFn(() => {}, {});
      }
      return {};
    }),
  };

  beforeEach(async () => {
    await graphql(schema, query).then((result) => {
      user = result.data.user;
      todoApp = shallow(<TodoApp user={user} relay={relay} />);
      AddTodoStatus.mockClear();
      mockSuccessFn.mockClear();
      mockFailureFn.mockClear();
    });
  });

  it('Renders correctly', () => {
    expect(shallowToJson(todoApp)).toMatchSnapshot();
  });

  describe('Unit test: handleAddTodo', () => {
    it('Success', () => {
      const content = 'testContent';
      todoApp.instance().handleAddTodo(content);
      expect(todoApp.instance().props.relay.commitUpdate).toHaveBeenCalled();
      expect(AddTodoStatus).toHaveBeenCalled();
      expect(mockSuccessFn).toHaveBeenCalled();
    });

    it('Fails', () => {
      const content = undefined;
      todoApp.instance().handleAddTodo(content);
      expect(todoApp.instance().props.relay.commitUpdate).toHaveBeenCalled();
      expect(AddTodoStatus).toHaveBeenCalled();
      expect(mockFailureFn).toHaveBeenCalled();
    });
  });
});
