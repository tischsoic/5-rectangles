import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import React from 'react';
import { List } from 'immutable';

import * as appActions from '../actions/app';
import Rectangle from '../components/Rectangle';
import {
  getRectangleRecord,
  convertRectangleRecordToDisplayData,
} from '../utils/utils';
import './App.scss';

export class App extends React.Component {
  constructor() {
    super();

    this.fstPoint = null;
    this.sndPoint = null;

    this.state = {
      windowWidth: 0,
      windowHeight: 0,
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  getRectangleToDisplay(rectangleRecord) {
    const { windowWidth, windowHeight } = this.state;
    const { removeRectangle } = this.props;
    const rectangleDisplayData = convertRectangleRecordToDisplayData(
      rectangleRecord,
      windowWidth,
      windowHeight,
    );
    const rectangleId = rectangleRecord.get('id');

    return (
      <Rectangle
        key={rectangleId}
        id={rectangleId}
        top={rectangleDisplayData.y}
        left={rectangleDisplayData.x}
        width={rectangleDisplayData.width}
        height={rectangleDisplayData.height}
        onRemove={removeRectangle}
      />
    );
  }

  updateWindowDimensions() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });

    this.fstPoint = null;
    this.sndPoint = null;
  }

  addRectangle() {
    const { addRectangle } = this.props;

    if (this.fstPoint === null || this.sndPoint === null) {
      return;
    }

    const x =
      this.fstPoint.x < this.sndPoint.x ? this.fstPoint.x : this.sndPoint.x;
    const y =
      this.fstPoint.y < this.sndPoint.y ? this.fstPoint.y : this.sndPoint.y;

    const width = Math.abs(this.fstPoint.x - this.sndPoint.x);
    const height = Math.abs(this.fstPoint.y - this.sndPoint.y);
    const { windowWidth, windowHeight } = this.state;
    const rectangleRecord = getRectangleRecord(
      x,
      y,
      width,
      height,
      windowWidth,
      windowHeight,
    );

    this.fstPoint = null;
    this.sndPoint = null;

    addRectangle(rectangleRecord);
  }

  addRectanglePoint(event) {
    const { clientX, clientY } = event;
    const point = {
      x: clientX,
      y: clientY,
    };

    if (this.fstPoint === null) {
      this.fstPoint = point;
    } else {
      this.sndPoint = point;
    }
  }

  render() {
    const { rectangles } = this.props;
    const rectanglesElements = rectangles
      .map((rectangleRecord) => this.getRectangleToDisplay(rectangleRecord))
      .toList();

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    return (
      <div
        className="app"
        role="presentation"
        onClick={(event) => {
          this.addRectanglePoint(event);
          this.addRectangle();
        }}
      >
        {rectanglesElements}
      </div>
    );
    /* eslint-enable */
  }
}

App.propTypes = {
  addRectangle: PropTypes.func.isRequired,
  removeRectangle: PropTypes.func.isRequired,
  rectangles: PropTypes.instanceOf(List).isRequired,
};

function mapStateToProps(state) {
  return {
    rectangles: state.rectangles,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addRectangle: bindActionCreators(appActions.addRectangle, dispatch),
    removeRectangle: bindActionCreators(appActions.removeRectangle, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
