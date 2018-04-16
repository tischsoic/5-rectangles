import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Rectangle from './Rectangle';

describe('Rectangle', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Rectangle
          key={0}
          id={0}
          top={10}
          left={20}
          width={30}
          height={40}
          onRemove={() => {}}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('calls onRemove with rectangle ID after click with ALT key', () => {
    const onRemoveMock = jest.fn();
    const rectangleId = 123;
    const rectangle = shallow(
      <Rectangle
        key={0}
        id={rectangleId}
        top={10}
        left={20}
        width={30}
        height={40}
        onRemove={onRemoveMock}
      />,
    );

    rectangle.find('div').simulate('click', {
      altKey: true,
      stopPropagation: () => {},
    });
    expect(onRemoveMock.mock.calls.length).toEqual(1);
    expect(onRemoveMock.mock.calls[0][0]).toEqual(rectangleId);
  });
});
