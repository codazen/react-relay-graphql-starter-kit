/* @flow */

import React from 'react';
import Relay from 'react-relay';
import ListItem from '../../../components/ListItem';
import RemoveTodoMutation from '../mutations/RemoveTodoMutation';
import UpdateTodoMutation from '../mutations/UpdateTodoMutation';

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

/**
 * ListItem wrapper for TodoList implementation
 * Parent component: TodoList
 * Child component: ListItem
 */
class TodoItem extends React.Component {

  props: Props;

  // removeTodo function passed to the ListItem component
  handleRemoveTodo = (id: string) => {
    this.props.relay.commitUpdate(
      new RemoveTodoMutation({ id, user: this.props.user }),
    );
  }

  // updateTodo function passed to the ListItem component
  handleUpdateTodo = (todo: Todo) => {
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
