import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Alignment from '../components/Alignment';
import Zoom from 'react-reveal/Zoom';
import { FormButton, Form } from './FormComponents';
import { startCreateUser } from '../_actions/authentication';
import { PanelTitle, RemaindWarapper } from './LoginForm';
import { FormContentWrapper } from './LoginForm';
import Input from '../components/Input';
import Link from '../components/Link';
import { FormFailureAlert } from './Alerts';

const TermOfUse = styled(Alignment)`
  color: ${p => p.theme.input.color};
  margin-left: 30px;
  margin-bottom: 50px;
`;
const TermOfUseLink = styled.a`
  color: ${p => p.theme.link};
  text-decoration: none;
`;
const TermOfUseText = styled.span`
  margin-left: 30px;
  margin-right: 5px;
`;

export class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        passwordRepeat: '',
        firstName: '',
        lastName: '',
        isSubmit: false,
        error: {
          code: '',
          msg: ''
        }
      }
    };
  }
  catchError = error => {
    this.setState(() => ({
      error: {
        code: error.code,
        msg: error.message
      }
    }));
  };

  onLoginChange = e => {
    const email = e.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        email
      }
    }));
  };
  onPasswordChange = e => {
    const password = e.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        password
      }
    }));
  };
  onPasswordRepeatChange = e => {
    const passwordRepeat = e.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        passwordRepeat
      }
    }));
  };
  onFirstNameChange = e => {
    const firstName = e.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        firstName
      }
    }));
  };
  onLastNameChange = e => {
    const lastName = e.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        lastName
      }
    }));
  };
  render() {
    const {
      email,
      password,
      isSubmit,
      firstName,
      lastName,
      passwordRepeat
    } = this.state.user;

    const { user, error } = this.state;
    const { startCreateUser, activePanel } = this.props;
    const onSubmit = e => {
      e.preventDefault();
      this.setState(() => ({ isSubmit: true }));
      if (email && password && firstName && lastName) {
        //console.log('startcreate',startCreateUser)
        startCreateUser(user, this.catchError);
      } else {
        if (!firstName || !lastName || !email || password) {
          let error = {
            code: 'all fields',
            message: 'You have to fill all the fields'
          };
          this.catchError(error);
        }
      }
    };
    return (
      <Zoom collapse>
        <span>
          <FormContentWrapper>
            {error && <FormFailureAlert text={error.msg} />}
            <PanelTitle>Create an account</PanelTitle>
            <Form onSubmit={onSubmit}>
              <Input
                iconName="fas fa-user icon"
                isSubmit={isSubmit}
                value={firstName}
                onChange={this.onFirstNameChange}
                label="First name"
                errorMessage="Type your first name"
              />
              <Input
                iconName="fas fa-signature"
                isSubmit={isSubmit}
                value={lastName}
                onChange={this.onLastNameChange}
                label="Last name"
                errorMessage="Type your last name"
              />
              <Input
                iconName="fas fa-at"
                isSubmit={isSubmit}
                value={email}
                onChange={this.onLoginChange}
                label="Email"
                errorMessage="Type email address"
              />
              <Input
                iconName="fas fa-lock"
                isSubmit={isSubmit}
                value={password}
                onChange={this.onPasswordChange}
                label="Password"
                errorMessage="Type password"
                type="password"
              />
              {/* <Input
                iconName="fa fa-lock icon"
                isSubmit={isSubmit}
                value={passwordRepeat}
                onChange={this.onPasswordRepeatChange}
                label="Password repeat"
                errorMessage="Repeat your password"
                type="password"
              /> */}
              {/* <TermOfUse horizontal="flex-start">
                <input type="checkbox" name="vehicle1" value="Bike" />
                <TermOfUseText>Accept the</TermOfUseText>
                <TermOfUseLink href="">Term of use</TermOfUseLink>
              </TermOfUse> */}

              <FormButton active={email && password ? 'active' : ''}>
                <span>Sign up</span>
              </FormButton>
            </Form>
            <RemaindWarapper>
              <div>Why should you start using this application ?</div>
              <Link to={'Read the guide'} />
            </RemaindWarapper>
          </FormContentWrapper>
        </span>
      </Zoom>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startCreateUser: (user, catchError) =>
    dispatch(startCreateUser(user, catchError))
});

export default connect(
  undefined,
  mapDispatchToProps
)(SignupForm);
