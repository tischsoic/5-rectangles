import {
  ADD_RECTANGLE,
  REMOVE_RECTANGLE,
} from '../constants/app';

export function addRectangle(rectangleRecord) {
  return {
    type: ADD_RECTANGLE,
    rectangleRecord,
  };
}

export function removeRectangle(rectangleId) {
  return {
    type: REMOVE_RECTANGLE,
    rectangleId,
  };
}

