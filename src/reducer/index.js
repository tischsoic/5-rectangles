import {
  ADD_RECTANGLE,
  REMOVE_RECTANGLE,
  MAX_RECTANGLE_COUNT,
} from '../constants/app';
import { AppState } from '../models';

const initialState = new AppState();

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_RECTANGLE: {
      const { rectangleRecord } = action;
      const rectangleWidth = rectangleRecord.get('width');
      const rectanglesCombinedWidth =
        rectangleWidth + state.get('rectanglesCombinedWidth');

      if (
        state.get('rectangles').size >= MAX_RECTANGLE_COUNT ||
        rectanglesCombinedWidth > 1
      ) {
        return state;
      }

      const newId = state.get('lastId') + 1;
      const rectangleRecordWithId = rectangleRecord.set('id', newId);
      const newState = state.mergeDeep({
        rectanglesCombinedWidth,
        rectangles: state.rectangles.push(rectangleRecordWithId),
        lastId: newId,
      });

      return newState;
    }
    case REMOVE_RECTANGLE: {
      const { rectangleId } = action;
      const rectangleRecordToRemove = state
        .get('rectangles')
        .find((rectangleRecord) => rectangleRecord.get('id') === rectangleId);
      const newRectanglesCombinedWidth =
        state.get('rectanglesCombinedWidth') -
        rectangleRecordToRemove.get('width');
      const newRectangles = state.rectangles.filter(
        (rectangleRecord) => rectangleRecord.id !== rectangleId,
      );

      const newState = state.mergeDeep({
        rectanglesCombinedWidth: newRectanglesCombinedWidth,
        rectangles: newRectangles,
      });

      return newState;
    }
    default:
      return state;
  }
}
