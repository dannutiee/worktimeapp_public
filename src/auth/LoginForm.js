import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FormButton, FormWrapper, Form } from './FormComponents';
import {
  startLoginWithGoogle,
  startLoginWithEmail
} from '../_actions/authentication';
import { FormFailureAlert } from './Alerts.js';
import Input from '../components/Input';
import Link from '../components/Link';
import Zoom from 'react-reveal/Zoom';

export const PanelTitle = styled.h2`
  text-transform: uppercase;
  margin-top: 0px;
  margin-bottom: 30px;
  padding-bottom: 10px;
  color: ${p => p.theme.headers.h2.color};
  font-weight: ${p => p.theme.headers.h2.fontWeight};
  font-size: ${p => p.theme.headers.h2.fontSize};
`;

export const RemaindWarapper = styled.div`
  position: absolute;
  bottom: 80px;
  text-align: center;
`;
export const FormContentWrapper = styled(FormWrapper)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  top: 0;
  position: absolute;
  left: 0;
  box-sizing: border-box;
`;
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      isSubmit: false,
      error: {
        code: '',
        msg: ''
      }
    };
  }

  onLoginChange = e => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };
  onPasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };
  toggleRememberMe = () => {
    this.setState({
      rememberMe: !this.state.rememberMe
    });
  };

  catchError = error => {
    this.setState(() => ({ error: { code: error.code, msg: error.message } }));
  };

  render() {
    const { email, password, isSubmit, error } = this.state;
    const {
      errorMessage,
      startLoginWithGoogle,
      startLoginWithEmail,
      activePanel
    } = this.props;

    const onSubmit = e => {
      e.preventDefault();
      this.setState(() => ({ isSubmit: true }));

      const { email, password, rememberMe } = this.state;
      if (email && password) {
        startLoginWithEmail(email, password, this.catchError);
      }
    };

    return (
      <Zoom collapse>
        <span>
          <FormContentWrapper>
            {error && <FormFailureAlert text={error.msg} />}

            <PanelTitle>
              {error.msg ? 'Try Again' : 'Login to continue'}
            </PanelTitle>

            <div />
            <Form onSubmit={onSubmit}>
              <Input
                iconName="fas fa-user icon"
                isSubmit={isSubmit}
                value={email}
                onChange={this.onLoginChange}
                label="Email"
                errorMessage="Type email address"
              />
              <Input
                iconName="fas fa-lock icon"
                isSubmit={isSubmit}
                value={password}
                onChange={this.onPasswordChange}
                label="Password"
                errorMessage="Type password"
                type="password"
              />

              {/* Will be add in the future 
                     <FormCheckboxWrapper>
                        <FormCheckbox 
                            type="checkbox"
                            placeholder="Remember me"
                            onChange = {this.toggleRememberMe}
                         />
                         <label>Remember me</label>
                    </FormCheckboxWrapper> */}
              <FormButton active={email && password ? 'active' : ''}>
                <span>Login</span>
              </FormButton>
            </Form>
            <RemaindWarapper>
              <div>Did you forget your password ?</div>
              <Link to={'Remaind me'} />
            </RemaindWarapper>
          </FormContentWrapper>
        </span>
      </Zoom>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startLoginWithGoogle: () => dispatch(startLoginWithGoogle()), // for futer functionality
  startLoginWithEmail: (email, password, catchError) =>
    dispatch(startLoginWithEmail(email, password, catchError))
});

export default connect(
  undefined,
  mapDispatchToProps
)(LoginForm);
