/* @flow */

import React from 'react';
import Relay from 'react-relay';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import AddTodoMutation from './mutations/AddTodoMutation';

type Props = {
  user: {
    todos: any,
  },
  relay: {
    commitUpdate: Function, // function to make mutation call to relay store
  },
};

/**
 * Container for todo application
 * Parent component: N/A
 * Child components: TodoList, TodoForm
 */
class TodoApp extends React.Component {

  props: Props;

  /**
   * addTodo function passed to the TodoForm
   * @param {content: string} content for new todo
   */
  handleAddTodo = (content: string) => {
    this.props.relay.commitUpdate(
      new AddTodoMutation({ content, user: this.props.user }),
    );
  }

  render() {
    return (
      <div className="todo-app-component">
        <h1>TODO APP</h1>
        <TodoForm addTodo={this.handleAddTodo} />
        <TodoList todos={this.props.user.todos} user={this.props.user} />
      </div>
    );
  }
}

exports.TodoApp = TodoApp;

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
