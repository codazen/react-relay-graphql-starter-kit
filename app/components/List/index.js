/* flow */

import React from 'react';
import ListItem from '../ListItem';

type Props = {
  listItems: any,
};

export default class List extends React.Component {

  constructor(props: Props) { // eslint-disable-line no-useless-constructor
    super(props);
  }

  render() {
    return (
      <ul>
        {this.props.listItems.map(listItem =>
          <ListItem content={listItem.content} key={listItem.id} />,
        )}
      </ul>
    );
  }
}
