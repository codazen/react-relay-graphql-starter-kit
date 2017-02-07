import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { TodoList } from '../TodoList';

global.React = React;

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
    });
  });
});
