/* @flow */

import React from 'react';
import Relay from 'react-relay';
import ListItem from '../../../components/ListItem';
import RemoveTodoMutation from '../RemoveTodoMutation';

type Props = {
  todo: {
    content: string,
    id: string,
  },
  user: {
    id: string,
  },
  relay: {
    commitUpdate: Function,
  },
};

class TodoItem extends React.Component {
  constructor(props: Props) { // eslint-disable-line
    super(props);

    (this:any).handleRemoveTodo = this.handleRemoveTodo.bind(this);
  }

  handleRemoveTodo(id: string) {
    this.props.relay.commitUpdate(
      new RemoveTodoMutation({ id, user: this.props.user }),
    );
  }

  render() {
    return (
      <ListItem
        content={this.props.todo.content}
        id={this.props.todo.id}
        removeItem={this.handleRemoveTodo}
      />
    );
  }
}

export default Relay.createContainer(TodoItem, {
  fragments: {
    todo: () => Relay.QL`
      fragment on Todo {
        id
        content
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id
        ${RemoveTodoMutation.getFragment('user')}
      }
    `,
  },
});
