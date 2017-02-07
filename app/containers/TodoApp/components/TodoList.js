/* @flow */

import React from 'react';
import Relay from 'react-relay';
import TodoItem from './TodoItem';

type TodoEdge = {
  node: {
    id: string,
  },
};

type Props = {
  todos: {
    edges: Array<TodoEdge>, // eslint-disable-line
  },
  user: Object
};

/**
 * Todo list component
 * Parent component: TodoApp
 * Child component: TodoItem
 */
class TodoList extends React.Component {

  props: Props;

  render() {
    const {
      todos,
      user,
    } = this.props;
    return (
      <div className='todo-list-component'>
        {todos.edges.map(edge =>
          <TodoItem
            key={edge.node.id}
            todo={edge.node}
            user={user}
          />,
        )}
      </div>
    );
  }
}

export default Relay.createContainer(TodoList, {
  fragments: {
    todos: () => Relay.QL`
      fragment on TodoConnection {
        edges {
          node {
            id
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
