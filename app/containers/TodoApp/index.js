/* @flow */

import React from 'react';
import Relay from 'react-relay';
import List from '../../components/List';
import TodoForm from './TodoForm';

type Todo = {
  id: number,
  content: string,
};

type Props = {
  data: Array<Todo>,
};

type State = {
  todos: Array<Todo>, // list of todos for app
  nextId: number, // id of next todo created
}

/**
 * Container for todo application
 * Parent component: N/A
 * Child components: List, TodoForm
 */
class TodoApp extends React.Component {

  static defaultProps: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      todos: props.data,
      nextId: 0,
    };

    (this:any).addTodo = this.addTodo.bind(this);
    (this:any).updateTodo = this.updateTodo.bind(this);
    (this:any).removeTodo = this.removeTodo.bind(this);
  }

  state: State;

  props: Props;

  addTodo(todo: string) {
    const newId = this.state.nextId;
    const newTodos = this.state.todos;
    newTodos.push({
      id: newId,
      content: todo,
    });
    this.setState({
      todos: newTodos,
      nextId: newId + 1,
    });
  }

  updateTodo(item: any) {
    const newTodos = this.state.todos;
    const index = newTodos.findIndex(element => element.id === item.id);
    if (index !== -1) {
      newTodos[index].content = item.content;
    }
    this.setState({
      todos: newTodos,
    });
  }

  removeTodo(id: any) {
    const newTodos = this.state.todos;
    const index = newTodos.findIndex(element => element.id === id);
    if (index !== -1) {
      newTodos.splice(index, 1);
    }
    this.setState({
      todos: newTodos,
    });
  }

  render() {
    console.log(this.props); // eslint-disable-line no-console
    return (
      <div>
        <h1>Todo App</h1>
        <TodoForm addTodo={this.addTodo} />
        <List
          listItems={this.state.todos}
          updateItem={this.updateTodo}
          removeItem={this.removeTodo}
        />
      </div>
    );
  }
}

TodoApp.defaultProps = {
  data: [],
};

export default Relay.createContainer(TodoApp, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        todos(first:1000){
          edges {
            node {
              id
              content
            }
          }
        }
      }
    `
  }
})
