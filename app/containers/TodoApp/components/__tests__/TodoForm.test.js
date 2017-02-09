import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TodoForm from '../TodoForm';

// setup React as a global variable
global.React = React;

describe('TodoForm component', () => {
  let todoForm;
  let event;

  // mock addTodo function
  const addTodo = jest.fn();

  describe('Tests with undefined addTodo prop', () => {
    beforeEach(() => {
      todoForm = shallow(<TodoForm />);
      addTodo.mockClear();
    });

    it('Renders correctly', () => {
      expect(shallowToJson(todoForm)).toMatchSnapshot();
    });

    describe('Unit test: handleChange', () => {
      beforeEach(() => {
        event = {
          target: {
            name: 'content',
            value: 'testValue',
          },
        };
      });

      it('handles input change', () => {
        expect(todoForm.instance().state.content).toBe('');
        todoForm.instance().handleChange(event);
        expect(todoForm.instance().state.content).toBe('testValue');
      });
    });

    describe('Unit test: handleSubmit', () => {
      beforeEach(() => {
        event = {
          preventDefault: () => {},
        };
      });

      it('handles submit without addTodo prop', () => {
        todoForm.instance().handleSubmit(event);
        expect(addTodo).not.toHaveBeenCalled();
        expect(todoForm.instance().state.content).toBe('');
      });
    });

    describe('addTodo functionality', () => {
      it('doesn\'t call addTodo on form submit', () => {
        todoForm.find('form').simulate('submit', { preventDefault: () => {} });
        expect(addTodo).not.toHaveBeenCalled();
        expect(todoForm.instance().state.content).toBe('');
      });
    });
  });

  describe('Tests with addTodo prop', () => {
    beforeEach(() => {
      todoForm = shallow(<TodoForm addTodo={addTodo} />);
      addTodo.mockClear();
    });

    it('Renders correctly', () => {
      expect(shallowToJson(todoForm)).toMatchSnapshot();
    });

    describe('Unit test: handleChange', () => {
      beforeEach(() => {
        event = {
          target: {
            name: 'content',
            value: 'testValue',
          },
        };
      });

      it('handles input change', () => {
        expect(todoForm.instance().state.content).toBe('');
        todoForm.instance().handleChange(event);
        expect(todoForm.instance().state.content).toBe('testValue');
      });
    });

    describe('Unit test: handleSubmit', () => {
      beforeEach(() => {
        event = {
          preventDefault: () => {},
        };
      });

      it('handles submit with addTodo prop', () => {
        todoForm.instance().state.content = 'testValue';
        todoForm.instance().handleSubmit(event);
        expect(addTodo).toHaveBeenCalledWith('testValue');
        expect(todoForm.instance().state.content).toBe('');
      });
    });

    describe('addTodo functionality', () => {
      it('calls addTodo on form submit', () => {
        todoForm.find('form').simulate('submit', { preventDefault: () => {} });
        expect(addTodo).toHaveBeenCalled();
        expect(todoForm.instance().state.content).toBe('');
      });
    });
  });
});
