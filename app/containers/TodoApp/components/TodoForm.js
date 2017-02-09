/* flow */

import React from 'react';

type Props = {
  addTodo: ?Function, // callback to create new todo in parent state
};

type State = {
  content: string, // content for new todo
};

/**
 * Form for creating a new todo item
 * Parent component: TodoApp
 * Child components: N/A
 */
export default class TodoForm extends React.Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  state: State;

  props: Props;

  handleChange = (event: any) => {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  /**
   * Makes call to addTodo mutation
   */
  handleSubmit = (event: any) => {
    const {
      addTodo,
    } = this.props;

    if (addTodo) {
      addTodo(this.state.content);
    }
    event.preventDefault();
    this.setState({
      content: '',
    });
  }

  render() {
    return (
      <div className="todo-form-component">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.content}
            name="content"
            placeholder="Add a task"
            onChange={this.handleChange}
          />
          <button action="submit">
            +
          </button>
        </form>
      </div>
    );
  }
}
