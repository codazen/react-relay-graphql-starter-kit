import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { makeExecutableSchema, addMockFunctionsToSchema, MockList } from 'graphql-tools';
import { graphql } from 'graphql';
import casual from 'casual';
import schemaString from 'data/schema.graphql';
import { TodoList } from '../TodoList';

global.React = React;
casual.seed(123);

const schema = makeExecutableSchema({ typeDefs: schemaString });

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

// Add mocks, modifies schema in place
addMockFunctionsToSchema({
  schema,
  mocks,
});

describe('TodoList component', () => {
  let todoList;
  let todos;
  let user;
  let query;
  describe('Tests with 10 todos', () => {
    query = `query
      TodoList {
        user {
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
    beforeEach(async () => {
      await graphql(schema, query).then((result) => {
        todos = result.data.user.todos;
        user = result.data.user;
        todoList = shallow(<TodoList todos={todos} user={user} />);
      });
    });

    it('Renders correctly', () => {
      expect(shallowToJson(todoList)).toMatchSnapshot();
    });
  });

  describe('Tests with no todos', () => {
    query = `query
      TodoList {
        user {
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
    beforeEach(async () => {
      await graphql(schema, query).then((result) => {
        todos = result.data.user.todos;
        user = result.data.user;
        todoList = shallow(<TodoList todos={todos} user={user} />);
      });
    });

    it('Renders correctly', () => {
      expect(shallowToJson(todoList)).toMatchSnapshot();
    });
  });
});
