import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { List } from 'immutable';
import { App } from './App';
import { RectangleRecord } from '../models';

describe('App', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <App
          addRectangle={() => {}}
          removeRectangle={() => {}}
          rectangles={List([new RectangleRecord({id: 0}), new RectangleRecord({id: 1})])}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
