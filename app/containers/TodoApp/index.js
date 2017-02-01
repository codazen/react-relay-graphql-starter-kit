/* @flow */

import React from 'react';
import Relay from 'react-relay';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

type Props = {
  user: {
    todos: any,
  },
};

/**
 * Container for todo application
 * Parent component: N/A
 * Child components: List, TodoForm
 */
class TodoApp extends React.Component {

  constructor(props: Props) { // eslint-disable-line
    super(props);
  }

  props: Props;

  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <TodoForm addTodo={() => {}} />
        <TodoList todos={this.props.user.todos} />
      </div>
    );
  }
}

export default Relay.createContainer(TodoApp, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        todos(first: 1000) {
          ${TodoList.getFragment('todos')}
        }
      }
    `,
  },
});
