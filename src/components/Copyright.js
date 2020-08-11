import React from 'react';
import styled from 'styled-components';

const CopyrightSentence = styled.span`
  position: absolute;
  bottom: 20px;
  width: 300px;
  transition: all 0.9s;
  text-align: ${p => (p.activePanel == 'Login' ? 'left' : 'right')};
  left: ${p =>
    p.activePanel != 'Login'
      ? 'calc(100% - 350px)'
      : p.theme.IntroPanel.padding};
  color: white;
  font-size: 14px;
`;

export class Copyright extends React.Component {
  render() {
    return (
      <CopyrightSentence activePanel={this.props.activePanel}>
        Copyright 2019 | Danuta Ludwikowska
      </CopyrightSentence>
    );
  }
}

export default Copyright;
