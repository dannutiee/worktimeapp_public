import React from 'react';
import styled from 'styled-components';

const WidgetBox = styled.div`
  width: 290px;
  background: ${p => p.theme.blueGradient};
  color: white;
  border-radius: ${p => p.theme.borderRadiusLight};
  margin-bottom: 20px;
  height: 33%;
  display: flex;
  box-shadow: ${p => p.theme.bottomShadow};
  max-height: 112px;
`;
const WidgetIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  border-right: 1px solid;
  padding: 20px;
`;
const WidgetInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-bottom: 1px solid;
  padding: 10px;
  :last-child {
    border-bottom: none;
  }
  font-size: 30px;
`;
const InfoLabel = styled(Info)`
  text-transform: uppercase;
  height: auto;
  padding: ${p => p.theme.padding};
  font-size: initial;
`;

class Widget extends React.Component {
  render() {
    const { icon, label, content } = this.props;
    return (
      <WidgetBox>
        <WidgetIcon>
          <i className={icon} />
        </WidgetIcon>
        <WidgetInfo>
          <InfoLabel>{label}</InfoLabel>
          <Info>{content}</Info>
        </WidgetInfo>
      </WidgetBox>
    );
  }
}

export default Widget;
