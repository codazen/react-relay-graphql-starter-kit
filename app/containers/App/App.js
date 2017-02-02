/* @flow */

import React from 'react';

type Props = {
  children: any,
};

export default class App extends React.Component {

  props: Props;

  render() {
    return (
      <div className='container'>
        {this.props.children}
      </div>
    );
  }
}
