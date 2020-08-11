import React, { Component } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import Axes from './Axes';
import Bars from './Bars';
import ResponsiveWrapper from './ResponsiveWrapper';

class Chart extends Component {
  constructor() {
    super();
    this.xScale = scaleBand();
    this.yScale = scaleLinear();
  }

  render() {
    const margins = { top: 10, right: 30, bottom: 50, left: 50 };
    const data = this.props.data;
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 600),
      height: 250
    };

    const maxValue = Math.max(...data.map(d => d.value.time));

    // scaleBand type
    const xScale = this.xScale
      .padding(0.5)
      // scaleBand domain should be an array of specific values
      // in our case, we want to use movie titles
      .domain(data.map(d => d.title))
      .range([margins.left, svgDimensions.width - margins.right]);

    // scaleLinear type
    const yScale = this.yScale
      // scaleLinear domain required at least two values, min and max
      .domain([0, maxValue < 9 ? 8 : maxValue + 1])
      .range([svgDimensions.height - margins.bottom, margins.top]);

    return (
      <svg width={svgDimensions.width} height={svgDimensions.height}>
        <Axes
          className="Axes"
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={svgDimensions}
          maxValue={maxValue}
        />
        <Bars
          className="Bars"
          scales={{ xScale, yScale }}
          margins={margins}
          data={data}
          maxValue={maxValue}
          svgDimensions={svgDimensions}
        />
      </svg>
    );
  }
}

export default ResponsiveWrapper(Chart);
