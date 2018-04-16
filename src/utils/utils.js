import { RectangleRecord } from '../models';

export function convertRectangleDataToPercents(rectangleData, width, height) {
  return {
    x: rectangleData.x / width,
    y: rectangleData.y / height,
    width: rectangleData.width / width,
    height: rectangleData.height / height,
  };
}

export function convertRectangleRecordToDisplayData(
  rectangleRecord,
  width,
  height,
) {
  return {
    x: rectangleRecord.x * width,
    y: rectangleRecord.y * height,
    width: rectangleRecord.width * width,
    height: rectangleRecord.height * height,
  };
}

export function getRectangleRecord(
  x,
  y,
  width,
  height,
  clientWidth,
  clientHeight,
) {
  const rectangleData = convertRectangleDataToPercents(
    { x, y, width, height },
    clientWidth,
    clientHeight,
  );

  return new RectangleRecord(rectangleData);
}
