import React, { Component } from 'react';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { interpolateLab } from 'd3-interpolate';
import Tooltip from './Tooltip';

class Bars extends Component {
  state = {
    tip: false,
    tooltip: {
      x: 0,
      y: 0,
      height: 0,
      time: 0,
      color: '',
      name: '',
      totalWorkTimeOnDay: '',
      id: ''
    }
  };

  getTheValuesObject = () => {
    let values = JSON.parse(JSON.stringify(this.props.data));

    for (let el in values) {
      delete values[el].id;
      delete values[el].title;
    }
    return values;
  };

  onMouseEnter = (time, color, x, y, name, totalWorkTimeOnDay, id) => {
    this.setState(() => ({
      tip: true,
      tooltip: {
        x: x,
        y: y,
        time: time,
        color: color,
        name: name,
        totalWorkTimeOnDay: totalWorkTimeOnDay,
        id: id
      }
    }));

    return <Tooltip />;
  };

  onMouseLeave = () => {
    this.setState(() => ({
      tip: false
    }));
  };

  sortValuesDecsending = values => {
    let ArrayOfObjects = Object.values(values);
    let ObjectOfValues = {};

    for (let value in values) {
      if (values[value].time === 0) {
        delete values[value];
      }
      ArrayOfObjects.sort((a, b) => {
        return parseFloat(b.time) - parseFloat(a.time);
      });

      for (let i = 0; i < ArrayOfObjects.length; i++) {
        if (i === 0) {
          ObjectOfValues[`value`] = ArrayOfObjects[i];
        } else {
          ObjectOfValues[`value${i}`] = ArrayOfObjects[i];
        }
      }
    }
    return ObjectOfValues;
  };

  render() {
    const { scales, margins, data, svgDimensions } = this.props;
    const { xScale, yScale } = scales;
    const { height } = svgDimensions;

    const colors = [
      'rgb(7, 167, 227)',
      '#20e9e3',
      '#b18edd',
      '#3b7eff',
      'yellow'
    ];

    //console.log('data', data);
    const values = this.getTheValuesObject();

    const bars = data.map((datum, i) => {
      const drawBars = () => {
        let ObjectOfValues = this.sortValuesDecsending(values[i]);
        let totalWorkTimeOnDay = ObjectOfValues.value.time;

        const fragment = Object.keys(ObjectOfValues).map((el, key) => {
          if (
            height - margins.bottom - scales.yScale(ObjectOfValues[el].time) !==
            0
          ) {
            let id = ObjectOfValues[el].name
              ? ObjectOfValues[el].name
              : `total-${datum.id}`;
            let name = ObjectOfValues[el].name
              ? ObjectOfValues[el].name
              : `Total-time: ${ObjectOfValues[el].time}`;
            let tipXposition = xScale(datum.title) + xScale.bandwidth() + 10;

            return (
              <React.Fragment key={key}>
                <rect
                  id={id}
                  className={'bar'}
                  x={0}
                  y={yScale(ObjectOfValues[el].time)}
                  height={
                    height -
                    margins.bottom -
                    scales.yScale(ObjectOfValues[el].time)
                  }
                  width={xScale.bandwidth()}
                  fill={colors[key]}
                  rx={5}
                  onMouseOver={() =>
                    this.onMouseEnter(
                      ObjectOfValues[el].time,
                      colors[key],
                      tipXposition,
                      yScale(ObjectOfValues[el].time),
                      name,
                      totalWorkTimeOnDay,
                      id
                    )
                  }
                  onMouseLeave={() => this.onMouseLeave()}
                />
              </React.Fragment>
            );
          }
        });
        return fragment;
      };

      return (
        <g
          key={i}
          className="Bars"
          transform={`translate(${xScale(datum.title)}, 0)`}
        >
          {drawBars()}
        </g>
      );
    });

    return (
      <React.Fragment>
        {bars}
        <foreignObject
          x={this.state.tooltip.x}
          y={this.state.tooltip.y}
          width="250"
          height="250"
        >
          <Tooltip show={this.state.tip} params={this.state.tooltip} />
        </foreignObject>
      </React.Fragment>
    );
  }
}

export default Bars;
