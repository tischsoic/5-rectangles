import React from 'react';
import PropTypes from 'prop-types';

import './Rectangle.scss';

const Rectangle = ({ id, top, left, width, height, onRemove }) => {
  const style = {
    top,
    left,
    width,
    height,
  };

  /* eslint-disable jsx-a11y/click-events-have-key-events */
  return (
    <div
      onClick={(event) => {
        if (event.altKey) {
          event.stopPropagation();
          onRemove(id);
        }
      }}
      role="presentation"
      className="rectangle"
      style={style}
    />
  );
  /* eslint-enable */
};

Rectangle.propTypes = {
  id: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Rectangle;
