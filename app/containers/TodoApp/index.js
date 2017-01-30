/* @flow */

import React from 'react';
import List from '../../components/List';

type Props = {
  children: any,
};

const listItems = [
  {
    id: 1,
    content: 'Item 1',
  },
  {
    id: 2,
    content: 'Item 2',
  },
  {
    id: 3,
    content: 'Item 3',
  },
];

export default class TodoApp extends React.Component {
  propTypes: Props;

  constructor(props: Props) { // eslint-disable-line no-useless-constructor
    super(props);
  }

  render() {
    return (
      <div>
        <List listItems={listItems} />
      </div>
    );
  }
}
