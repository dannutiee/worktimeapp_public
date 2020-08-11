import React from 'react';
import styled from 'styled-components';
import { Loader } from 'semantic-ui-react';

const LoadingWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => (
  <LoadingWrapper>
    <Loader active inline="centered" />
  </LoadingWrapper>
);

export default Loading;
