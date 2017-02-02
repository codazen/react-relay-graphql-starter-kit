/* @flow */

import React from 'react';
import Relay from 'react-relay';
import ListItem from '../../../components/ListItem';
import RemoveTodoMutation from '../RemoveTodoMutation';
import UpdateTodoMutation from '../UpdateTodoMutation';

type Todo = {
  id: string,
  content: string,
};

type Props = {
  todo: Todo,
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
    (this:any).handleUpdateTodo = this.handleUpdateTodo.bind(this);
  }

  handleRemoveTodo(id: string) {
    this.props.relay.commitUpdate(
      new RemoveTodoMutation({ id, user: this.props.user }),
    );
  }

  handleUpdateTodo(todo: Todo) {
    this.props.relay.commitUpdate(
      new UpdateTodoMutation({ todo: this.props.todo, content: todo.content }),
    );
  }

  render() {
    return (
      <ListItem
        content={this.props.todo.content}
        id={this.props.todo.id}
        removeItem={this.handleRemoveTodo}
        updateItem={this.handleUpdateTodo}
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
        ${UpdateTodoMutation.getFragment('todo')}
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
