/* @flow */

import React from 'react';

type Props = {
  content: string, // initial item content
  id: any, // id of item
  updateItem: ?Function, // callback for updating listItem
  removeItem: ?Function, // callback for removing listItem
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
  }

  state: State;

  props: Props;

  handleChange = (event: any) => {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  /**
   * Makes removeItem call
   */
  handleRemove = () => {
    const {
      removeItem,
    } = this.props;
    if (removeItem) {
      removeItem(this.state.id);
    }
  }

  /**
   * Changes span to input for inline editing an item's content
   */
  openEditMode = () => {
    this.setState({
      editStatus: true,
    });
  }

  /**
   * Makes updateItem call on click out of ListItem through onBlur event listener
   */
  closeEditMode = () => {
    const {
      updateItem,
    } = this.props;
    if (updateItem) {
      updateItem({
        id: this.state.id,
        content: this.state.content,
      });
    }
    this.setState({
      editStatus: false,
    });
  }

  render() {
    return (
      <div className='list-item-component'>
        {this.state.editStatus ?
          <input
            autoFocus
            type='text'
            value={this.state.content}
            name='content'
            onChange={this.handleChange}
            onBlur={this.closeEditMode}
          />
          :
          <div>
            <span onClick={this.props.updateItem ? this.openEditMode : null}>
              {this.state.content}
            </span>
            <button onClick={this.handleRemove}>
              x
            </button>
          </div>
        }
      </div>
    );
  }
}
