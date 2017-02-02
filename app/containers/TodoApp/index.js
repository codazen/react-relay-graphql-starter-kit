/* @flow */

import React from 'react';
import Relay from 'react-relay';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import AddTodoMutation from './AddTodoMutation';

type Props = {
  user: {
    todos: any,
  },
  relay: {
    commitUpdate: Function,
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

    (this:any).handleAddTodo = this.handleAddTodo.bind(this);
  }

  props: Props;

  handleAddTodo(content) {
    this.props.relay.commitUpdate(
      new AddTodoMutation({ content, user: this.props.user }),
    );
  }

  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <TodoForm addTodo={this.handleAddTodo} />
        <TodoList todos={this.props.user.todos} />
      </div>
    );
  }
}

export default Relay.createContainer(TodoApp, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
        todos(first: 1000) {
          ${TodoList.getFragment('todos')}
        }
        ${AddTodoMutation.getFragment('user')}
      }
    `,
  },
});
