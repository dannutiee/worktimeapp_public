import React from 'react';
import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-spacing: unset;
  border-collapse: collapse;
`;
export const TableCell = styled.td`
  padding: ${p => p.theme.Table.cellPadding};
  color: ${p => p.theme.link};
  font-size: ${p => p.theme.fontSizeBasic};
  cursor: pointer;
  width: 100%;
  max-width: ${p => (p.stickyWidth ? '500px' : 'unset')};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background: ${p => (p.isDisabled ? p.theme.bgColor : 'inherit')};
  min-width: 170px;
`;

export const TableHeader = styled.th`
  background: ${p => p.theme.Table.headerBg};
  padding: ${p => p.theme.Table.headerPadding};
  color: ${p => p.theme.Table.headerTextColor};
  text-align: left;
`;

export const HeaderRow = styled.tr`
  margin-bottom: 20px;
  height: 50px;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid;
  border-color: ${p => p.theme.Table.rowBorderColor};
  height: 50px;
`;
