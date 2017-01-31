/* flow */

import React from 'react';
import ListItem from '../ListItem';

type Item = {
  id: any,
  content: string,
};

type Props = {
  listItems: any,
  updateItem: (Item) => void, // callback for updating listItem
  removeItem: (id: any) => void, // callback for removing listItem
};

/**
 * Generic list Component
 * Parent component: N/A
 * Child component(s): ListItem
 */
export default class List extends React.Component {

  constructor(props: Props) { // eslint-disable-line no-useless-constructor
    super(props);
  }

  props: Props;

  render() {
    return (
      <div>
        {this.props.listItems.map(listItem =>
          <ListItem
            content={listItem.content}
            id={listItem.id}
            key={listItem.id}
            updateItem={this.props.updateItem}
            removeItem={this.props.removeItem}
          />,
        )}
      </div>
    );
  }
}
