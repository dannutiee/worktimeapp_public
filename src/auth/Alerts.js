import React from 'react';
import styled from 'styled-components';

const AlertWrapper = styled.div`
  padding: 10px;
  text-align: center;
  color: #4aa5de;
  margin-top: -20px;
  margin-bottom: 20px;
`;

export const FormFailureAlert = props => (
  <AlertWrapper>{props.text}</AlertWrapper>
);
