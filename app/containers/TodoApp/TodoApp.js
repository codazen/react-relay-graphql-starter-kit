/* @flow */

import React from 'react';
import Relay from 'react-relay';
import { browserHistory } from 'react-router';
import Axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import AddTodoMutation from './mutations/AddTodoMutation';

type Props = {
  user: {
    firstName: string,
    lastName: string,
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
      {
        onFailure: () => {
          // Need to add better logic here for determining what
          // is happening in regards to a mutation error
          browserHistory.push('/login');
        },
        onSuccess: () => {},
      },
    );
  }

  handleLogout = () => {
    Axios.post('http://localhost:8080/logout',
      {},
      { withCredentials: true })
      .then(() => {
        browserHistory.push('/login');
      })
      .catch(() => {
      });
  }

  render() {
    const {
      firstName,
      lastName,
    } = this.props.user;
    return (
      <div className="todo-app-component">
        <h1>{`${firstName} ${lastName}'s TODO APP`}</h1>
        <TodoForm addTodo={this.handleAddTodo} />
        <TodoList todos={this.props.user.todos} user={this.props.user} />
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

exports.TodoApp = TodoApp;

export default Relay.createContainer(TodoApp, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        firstName
        lastName
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
