/* @flow */

import React from 'react';
import Relay from 'react-relay';
import TodoItem from './TodoItem';

type TodoEdge = {
  node: {
    id: string,
    isChecked: boolean,
  },
};

type Props = {
  todos: {
    edges: Array<TodoEdge>, // eslint-disable-line
  },
  user: Object,
  filter: string
};

/**
 * Todo list component
 * Parent component: TodoApp
 * Child component: TodoItem
 */
class TodoList extends React.Component {

  props: Props;

  render() {
    const rows = [];
    const {
      todos,
      user,
    } = this.props;

    todos.edges.forEach((edge) => {
      if ((this.props.filter === 'all') ||
      (edge.node.isChecked === (this.props.filter === 'complete'))) {
        rows.push(<TodoItem
          key={edge.node.id}
          todo={edge.node}
          user={user}
        />);
      }
    },
  );
    return (
      <div className="todo-list-component">
        {rows}
      </div>
    );
  }
}

exports.TodoList = TodoList;

export default Relay.createContainer(TodoList, {
  fragments: {
    todos: () => Relay.QL`
      fragment on TodoConnection {
        edges {
          node {
            id
            isChecked
            ${TodoItem.getFragment('todo')}
          }
        }
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        ${TodoItem.getFragment('user')}
      }
    `,
  },
});
