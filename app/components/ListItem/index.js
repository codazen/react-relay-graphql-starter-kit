/* @flow */

import React from 'react';

type Item = {
  id: any,
  content: string,
};

type Props = {
  content: string, // initial item content
  id: any, // id of item
  updateItem: (Item) => void, // callback for updating listItem
  removeItem: (id: any) => void, // callback for removing listItem
};

type State = {
  editStatus: boolean, // keeps track of what view to display
  content: string, // display content of item
  id: any, // id reference for item
};

/**
 * Generic list item component
 * Parent component: List
 * Child component: N/A
 */
export default class ListItem extends React.Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      editStatus: false,
      content: props.content,
      id: props.id,
    };

    (this:any).openEditMode = this.openEditMode.bind(this);
    (this:any).closeEditMode = this.closeEditMode.bind(this);
    (this:any).handleChange = this.handleChange.bind(this);
  }

  state: State;

  props: Props;

  handleChange(event: any) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  openEditMode() {
    this.setState({
      editStatus: true,
    });
  }

  closeEditMode() {
    this.props.updateItem({
      id: this.state.id,
      content: this.state.content,
    });
    this.setState({
      editStatus: false,
    });
  }

  render() {
    return (
      <div>
        {this.state.editStatus ?
          <div>
            <input
              autoFocus
              type='text'
              value={this.state.content}
              name='content'
              onChange={this.handleChange}
              onBlur={this.closeEditMode}
            />
            <button onClick={this.closeEditMode}>
              Save
            </button>
          </div>
          :
          <div>
            <span onClick={this.props.updateItem ? this.openEditMode : null}>
              {this.state.content}
            </span>
            <button onClick={() => { this.props.removeItem(this.state.id); }}>
              Delete
            </button>
          </div>
        }
      </div>
    );
  }
}
