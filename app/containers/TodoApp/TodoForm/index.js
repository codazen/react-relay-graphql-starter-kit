/* flow */

import React from 'react';

type Props = {
  addTodo: () => void, // callback to create new todo in parent state
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

  static defaultProps: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      content: '',
    };

    (this:any).handleChange = this.handleChange.bind(this);
    (this:any).handleSubmit = this.handleSubmit.bind(this);
  }

  state: State;

  props: Props;

  handleChange(event) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addTodo(this.state.content);
    this.setState({
      content: '',
    });
  }

  render() {
    return (
      <div>
        <h2>Todo Form</h2>
        <input
          type='text'
          value={this.state.content}
          name='content'
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>
          + Todo
        </button>
      </div>
    );
  }
}

TodoForm.defaultProps = {
  addTodo: () => {},
};
