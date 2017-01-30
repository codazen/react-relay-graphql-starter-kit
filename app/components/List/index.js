/* flow */

import React from 'react';
import ListItem from '../ListItem';

type Props = {
  listItems: any,
  updateItem: () => void,
  removeItem: () => void,
};

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
