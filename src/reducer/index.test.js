import { List } from 'immutable';
import appReducer from './';
import { AppState, RectangleRecord } from '../models';
import { ADD_RECTANGLE, REMOVE_RECTANGLE } from '../constants/app';

describe('App reducer', () => {
  it('stores only 5 rectangles', () => {
    const initialState = new AppState();
    let state = initialState;

    for (let i = 0; i < 5; i += 1) {
      state = appReducer(state, {
        type: ADD_RECTANGLE,
        rectangleRecord: new RectangleRecord(),
      });
    }
    const stateAfter5Additions = state;
    const stateAfter6Additions = appReducer(stateAfter5Additions, {
      type: ADD_RECTANGLE,
      rectangleRecord: new RectangleRecord(),
    });

    expect(stateAfter6Additions).toEqual(stateAfter5Additions);
  });

  it('discard rectagle if sum of widths is greater than viewport', () => {
    const initialState = new AppState();
    const state = initialState;
    const stateWithWideRectangle = appReducer(state, {
      type: ADD_RECTANGLE,
      rectangleRecord: new RectangleRecord({ width: 0.99 }),
    });

    const stateAfterAdditionOfAnotherBigRectangle = appReducer(
      stateWithWideRectangle,
      {
        type: ADD_RECTANGLE,
        rectangleRecord: new RectangleRecord({ width: 0.99 }),
      },
    );

    expect(stateAfterAdditionOfAnotherBigRectangle).toEqual(
      stateWithWideRectangle,
    );
  });

  it('enables removal of rectangles', () => {
    const initialState = new AppState();
    const state = initialState;
    const stateWith1Rectangle = appReducer(state, {
      type: ADD_RECTANGLE,
      rectangleRecord: new RectangleRecord({ width: 0.1 }),
    });
    const newRectangle1Id = stateWith1Rectangle.lastId;
    const stateWith2Rectangle = appReducer(stateWith1Rectangle, {
      type: ADD_RECTANGLE,
      rectangleRecord: new RectangleRecord({ width: 0.2 }),
    });
    const newRectangle2Id = stateWith2Rectangle.lastId;
    const stateWith3Rectangle = appReducer(stateWith2Rectangle, {
      type: ADD_RECTANGLE,
      rectangleRecord: new RectangleRecord({ width: 0.09 }),
    });
    const newRectangle3Id = stateWith3Rectangle.lastId;

    const stateAfterRectangleRemoved = appReducer(stateWith3Rectangle, {
      type: REMOVE_RECTANGLE,
      rectangleId: newRectangle2Id,
    });

    expect(
      stateAfterRectangleRemoved.rectangles.map((rectangleRecord) =>
        rectangleRecord.get('id'),
      ),
    ).toEqual(List([newRectangle1Id, newRectangle3Id]));
  });
});
