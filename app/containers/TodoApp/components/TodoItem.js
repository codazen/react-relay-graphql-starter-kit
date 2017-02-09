/* @flow */

import React from 'react';
import Relay from 'react-relay';
import ListItem from 'components/ListItem';
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
    commitUpdate: Function, // function to make mutation call to relay store
  },
};

/**
 * ListItem wrapper for TodoList implementation
 * Parent component: TodoList
 * Child component: ListItem
 */
class TodoItem extends React.Component {

  props: Props;

  /**
   * removeTodo function passed to the ListItem component
   * @param {id: string} id of todo to be removed
   */
  handleRemoveTodo = (id: string) => {
    this.props.relay.commitUpdate(
      new RemoveTodoMutation({ id, user: this.props.user }),
    );
  }

  /**
   * updateTodo function passed to the ListItem component
   * @param {todo: Todo} todo node containing id and content
   */
  handleUpdateTodo = (todo: Todo) => {
    this.props.relay.commitUpdate(
      new UpdateTodoMutation({ todo: this.props.todo, content: todo.content }),
    );
  }

  render() {
    const {
      content,
      id,
    } = this.props.todo;
    return (
      <ListItem
        content={content}
        id={id}
        removeItem={this.handleRemoveTodo}
        updateItem={this.handleUpdateTodo}
      />
    );
  }
}

exports.TodoItem = TodoItem;

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
