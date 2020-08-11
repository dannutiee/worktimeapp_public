import React from 'react';
import styled from 'styled-components';

const IconWrapper = styled.span`
  background: ${p => p.theme.blueGradient};
  position: absolute;
  display: block;
  display: flex;
  width: 60px;
  top: 0;
  height: 100%;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  align-items: center;
  align-items: center;
  justify-content: center;
  i {
    color: white !important;
    margin-left: 4px !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const InputLabel = styled.span`
  position: absolute;
  left: 75px;
  font-size: 16px;
  color: ${p => p.theme.input.color};
  font-weight: 500;
  z-index: -1;
  transform-origin: 0 0;
  transition: all 0.2s ease;
`;

const FormInput = styled.input`
  border: none;
  border: 1px solid ${p => p.theme.input.borderColor};
  border-radius: ${p => p.theme.borderRadius};
  padding: ${p => p.theme.input.padding};
  outline: none;
  background: transparent;
  width: -webkit-fill-available;
  padding-left: 75px;
  :focus {
    border-color: ${p => p.theme.input.focus.color};
    + span {
      transform: translateY(-22px) scale(0.75);
      color: ${p => p.theme.input.focus.color};
      background: white;
      padding: 0 15px;
      z-index: 0;
    }
  }
  :not(:placeholder-shown) {
    + span {
      transform: translateY(-22px) scale(0.75);
      background: white;
      padding: 0 15px;
      z-index: 0;
    }
  }

  transition: all 0.4s;
`;
const FormInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  .icon,
  .error {
    padding: 15px 0;
    position: absolute;
    margin-left: 20px;
    color: #b9b9b9;
  }
  label {
    color: #b9b9b9;
    font-weight: lighter;
    font-size: 14px;
  }
  .error {
    right: 20px;
    font-weight: bold;
    color: rgba(136, 73, 146, 0.65);
    i {
      padding-left: 10px;
    }
  }
`;

const ErrorMsg = styled.span`
  position: absolute;
  right: 20px;
  font-size: ${p => p.theme.input.fontSize};
  color: ${p => p.theme.input.errorColor};
  i {
    padding-left: 10px;
  }
`;

const Input = ({
  iconName,
  isSubmit,
  value,
  onChange,
  label,
  errorMessage,
  type
}) => (
  <FormInputWrapper>
    <IconWrapper>
      <i className={iconName} />
    </IconWrapper>
    {isSubmit && !value ? <ErrorMsg>{errorMessage}</ErrorMsg> : ''}
    <FormInput
      type={type}
      value={value}
      onChange={onChange}
      placeholder="&nbsp;"
    />
    <InputLabel>{label}</InputLabel>
  </FormInputWrapper>
);

export default Input;
