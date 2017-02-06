/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import App from '../App';

global.React = React;

describe('App component', () => {
  it('Renders correctly', () => {
    const app = shallow(<App />);
    expect(shallowToJson(app)).toMatchSnapshot();
  });
});
