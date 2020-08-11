import styled from 'styled-components';
import media from 'styled-media-query';
import { PrimaryButton } from '../components/Buttons';

export const FormButton = styled(PrimaryButton)`
    color: ${props =>
      props.active ? p => p.theme.input.focus.color : p => p.theme.input.color};
    border-color: ${props =>
      props.active ? p => p.theme.input.focus.color : p => p.theme.input.color};
}
`;

export const FormCheckbox = styled.input`
  margin-left: 20px;
  margin-right: 20px;
`;

export const FormCheckboxWrapper = styled.div`
  cursor: pointer;
  width: fit-content;
  padding: 5px 0;
  label,
  input {
    cursor: pointer;
  }
`;

export const FormWrapper = styled.div`
    top: 0;
    position: absolute;
    right:  ${props => (props.activePanel == 'Login' ? '0' : '50%')};
    height: 100%;
    width: 50%;
    z-index:2;
    padding:20px;
    display:flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    background: white;
    box-shadow: ${p => p.theme.leftShadow};
    transition: .7s all ease;
    -webkit-transition: .7s all ease;
    ${media.lessThan('medium')`
    /* screen width is less than 768px (medium) */
    padding: 50px 3rem;
  `}

  ${media.between('medium', 'large')`
    /* screen width is between 768px (medium) and 1170px (large) */
    padding: 50px 5rem;
  `}

  ${media.greaterThan('large')`
    /* screen width is greater than 1170px (large) */
    padding: 50px 8rem;
  `}
  ${media.greaterThan('1350px')`
  /* screen width is greater than 1170px (large) */
  padding: 50px 9rem;
`}
`;

export const Form = styled.form`
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: none;
`;
