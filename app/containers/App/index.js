/* @flow */

import React from 'react';

type Props = {
  children: any,
};

export default class App extends React.Component {
  propTypes: Props;

  constructor(props: Props) { // eslint-disable-line no-useless-constructor
    super(props);
  }

  render() {
    return (
      <div>
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
