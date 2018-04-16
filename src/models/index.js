import { Record, List } from 'immutable';

export const RectangleRecord = Record({
  id: null,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
});

export const AppState = Record({
  rectangles: List(),
  rectanglesCombinedWidth: 0,
  lastId: 0,
});
