/* @flow */

import React from 'react';

type Props = {
  children: any,
};

export default class App extends React.Component {

  constructor(props: Props) { // eslint-disable-line no-useless-constructor
    super(props);
  }

  props: Props;

  render() {
    return (
      <div className='container'>
        {this.props.children}
      </div>
    );
  }
}
