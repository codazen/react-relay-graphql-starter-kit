/* @flow */

import React from 'react';
import List from '../../components/List';
import TodoForm from './TodoForm';

type Props = {
  data: any,
};

type State = {
  todos: any,
  nextId: number,
}

export default class TodoApp extends React.Component {

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
    for (let i = 0; i < newTodos.length; i++) {
      if (newTodos[i].id === item.id) {
        newTodos[i].content = item.content;
        break;
      }
    }
    this.setState({
      todos: newTodos,
    });
  }

  removeTodo(id: any) {
    const newTodos = this.state.todos;
    for (let i = 0; i < newTodos.length; i++) {
      if (newTodos[i].id === id) {
        newTodos.splice(i, 1);
        break;
      }
    }
    this.setState({
      todos: newTodos.length === 0 ? [] : newTodos,
    });
  }

  render() {
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
