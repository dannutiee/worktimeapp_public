import React from 'react';
import Axis from './Axis';
import * as d3 from 'd3';

export default ({ scales, margins, svgDimensions, maxValue }) => {
  const { height, width } = svgDimensions;

  const xProps = {
    orient: 'Bottom',
    scale: scales.xScale,
    translate: `translate(0, ${height - margins.bottom})`,
    tickSize: height - margins.top - margins.bottom
  };

  const yProps = {
    orient: 'Left',
    scale: scales.yScale,
    translate: `translate(${margins.left}, 0)`,
    tickSize: width - margins.left - margins.right,
    maxValue: maxValue
  };

  return (
    <g className="Axes">
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  );
};
