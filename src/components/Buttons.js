import styled from 'styled-components';

export const PrimaryButton = styled.button`
  width: 100%;
  outline: none;
  background: white;
  padding: ${p => p.theme.input.padding};
  box-sizing: border-box;
  margin-bottom: 20px;
  display: flex;
  border: 1px solid #00abe2;
  justify-content: center;
  border-radius: 50px;
  color: #00aae5;
  cursor: pointer;

  text-transform: uppercase;
  :last-child {
    // margin-bottom: unset;
    //margin-bottom: 60px;
  }
  :hover {
    box-shadow: ${p => p.theme.bottomShadowHover};
  }
  transition: all 0.7s ease;
`;

export const ActionButton = styled.div`
  border-right: 1px solid ${p => p.theme.colorBlue};
  padding: 5px;
  color: ${p => (p.active ? 'white' : p => p.theme.colorBlue)};
  background: ${p => (p.active ? p => p.theme.colorBlue : 'inherit')};
  font-size: 15px;
  &:hover {
    color: ${p => (p.active ? 'white' : p => p.theme.colorGreen)};
  }
  & :last-child {
    border-right: unset;
  }
  i {
    margin-right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const SingleActionButton = styled(ActionButton)`
  border: ${p =>
    p.disabled ? p.theme.button.disabled.border : p.theme.button.active.border};
  border-radius: ${p => p.theme.borderRadiusLight};
  color: ${p =>
    p.disabled ? p.theme.button.disabled.color : p.theme.button.active.color};
  margin-right: 5px;
  cursor: pointer;
  :last-child {
    margin-right: 0px;
    border-right: ${p =>
      p.disabled
        ? p.theme.button.disabled.border
        : p.theme.button.active.border};
  }
  &:hover {
    color: inherit;
  }
`;

export const ConfirmationButton = styled.div`
  border: 1px solid ${p => p.theme.colorBlue};
  padding: ${p => p.theme.input.padding};
  color: ${p => (p.positive ? 'white' : p => p.theme.colorBlue)};
  background: ${p => (p.positive ? p => p.theme.colorBlue : 'inherit')};
  margin-right: 10px;
  & :last-child {
    margin-right: unset;
  }
  cursor: pointer;
  border-radius: 5px;
`;
