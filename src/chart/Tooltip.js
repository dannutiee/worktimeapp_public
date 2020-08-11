import React from 'react';
import styled from 'styled-components';
import { convertToHHMM } from '../helpers/covertDecimalToTime';

const Tip = styled.div`
  display: ${p => (p.show === true ? 'bock' : 'none')};
  width: 100px;
  height: auto;
  background: white;
  position: absolute;
  z-index: 6;
  fill: blue;
  box-shadow: 0 9px 23px rgba(0, 0, 0, 0.09), 0 5px 5px rgba(0, 0, 0, 0.06);
  width: fit-content;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #dedede;
`;

const TimeInfo = styled.div`
  color: #03a8e0;
  font-size: 15px;
`;

const NameInfo = styled.div`
  font-size: 15px;
  color: #03a8e0;
`;

const Label = styled.div`
  color: grey;
  min-width: 80px;
`;

const InfoRow = styled.div`
  padding-bottom: 10px;
`;

const Tooltip = props => {
  const { time, name, totalWorkTimeOnDay, id, x, height, color } = props.params;
  let tooltipForTask = id === name;
  return (
    <Tip show={props.show}>
      {tooltipForTask && (
        <React.Fragment>
          <InfoRow>
            <Label>Task title: </Label>
            <NameInfo>{name}</NameInfo>
          </InfoRow>
          <InfoRow>
            <Label>Task time: </Label>
            <TimeInfo>{convertToHHMM(time)}</TimeInfo>
          </InfoRow>
        </React.Fragment>
      )}
      <InfoRow>
        <Label>Total time at work: </Label>
        <TimeInfo>{convertToHHMM(totalWorkTimeOnDay)}</TimeInfo>
      </InfoRow>
    </Tip>
  );
};

export default Tooltip;
