/* @flow */

import React from 'react';

type Props = {
  content: string
};

export default class ListItem extends React.Component {

  constructor(props: Props) { // eslint-disable-line no-useless-constructor
    super(props);
  }

  render() {
    return (
      <li>
        {this.props.content}
      </li>
    );
  }
}
