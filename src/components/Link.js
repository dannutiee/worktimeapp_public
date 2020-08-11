import React from 'react';
import styled from 'styled-components';

const StyledLink = styled.a`
  color: ${p => p.theme.link};
  font-size: 16px;
  text-decoration: none;
  display: block;
  margin: 10px 0;
`;

const Link = ({ to }) => (
  <React.Fragment>
    <StyledLink href={to}>{to}</StyledLink>
  </React.Fragment>
);

export default Link;
