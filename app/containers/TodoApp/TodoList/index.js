/* @flow */

import React from 'react';
import Relay from 'react-relay';
import TodoItem from '../TodoItem';

type TodoEdge = {
  node: {
    id: string,
  },
};

type Props = {
  todos: {
    edges: Array<TodoEdge>,
  },
};

class TodoList extends React.Component {
  constructor(props: Props) { // eslint-disable-line
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Todo List</h2>
        {this.props.todos.edges.map(edge =>
          <TodoItem key={edge.node.id} todo={edge.node} />,
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
  },
});
