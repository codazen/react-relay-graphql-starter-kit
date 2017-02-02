/* @flow */

import React from 'react';
import Relay from 'react-relay';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import AddTodoMutation from './mutations/AddTodoMutation';

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
 * Child components: TodoList, TodoForm
 */
class TodoApp extends React.Component {

  props: Props;

  // addTodo function passed to the TodoForm
  handleAddTodo = (content: string) => {
    this.props.relay.commitUpdate(
      new AddTodoMutation({ content, user: this.props.user }),
    );
  }

  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <TodoForm addTodo={this.handleAddTodo} />
        <TodoList todos={this.props.user.todos} user={this.props.user} />
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
        ${TodoList.getFragment('user')}
        ${AddTodoMutation.getFragment('user')}
      }
    `,
  },
});
