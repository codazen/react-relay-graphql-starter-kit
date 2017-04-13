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

type State = {
  filter: string, // filter for new todo
  showFilter: boolean // filter state
};

/**
 * Container for todo application
 * Parent component: N/A
 * Child components: TodoList, TodoForm
 */
class TodoApp extends React.Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      filter: 'all',
      showFilter: false,
    };
  }

  state: State;

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

  /**
  * handleFilterInput function passed to the TodoForm
  */
  handleFilterInput = (event: any) => {
    this.setState({
      filter: event.target.name,
      showFilter: false,
    });
  }

  /**
  * handleToggleInput function passed to the TodoForm
  */
  toggleShowFilter = () => {
    this.setState({
      showFilter: !this.state.showFilter,
    });
  }

  /**
  * Close filter on move out
  */
  collapseFilter = () => {
    this.setState({
      showFilter: false,
    });
  }

  render() {
    return (
      <div className="todo-app-component" >
        <h1>TODO APP</h1>
        <TodoForm
          addTodo={this.handleAddTodo}
          filter={this.state.filter}
          showFilter={this.state.showFilter}
          toggleShowFilter={this.toggleShowFilter}
          collapseFilter={this.collapseFilter}
          handleFilterInput={this.handleFilterInput}
        />
        <TodoList
          todos={this.props.user.todos}
          user={this.props.user}
          filter={this.state.filter}
        />
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
