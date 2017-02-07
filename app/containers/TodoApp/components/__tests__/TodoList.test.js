import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import schemaString from 'data/schema.graphql';
import { TodoList } from '../TodoList';

global.React = React;

const schema = makeExecutableSchema({ typeDefs: schemaString });

// Add mocks, modifies schema in place
addMockFunctionsToSchema({ schema });

const query = `
query tasksForUser {
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

describe('TodoList component', () => {
  let todoList;

  const todos = {
    edges: [
      {
        node: {
          id: '1',
        },
      },
      {
        node: {
          id: '2',
        },
      },
    ],
  };

  const user = {};

  describe('Tests with undefined todos and user props', () => {
    beforeEach(() => {
      todoList = shallow(<TodoList todos={todos} user={user} />);
    });

    it('Renders correctly without todos and user props', () => {
      expect(shallowToJson(todoList)).toMatchSnapshot();
      graphql(schema, query).then(result => console.log('Got result', result, result.data.user.todos.edges)); // eslint-disable-line
    });
  });
});
