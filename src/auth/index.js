import React from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import PanelIntro from './PanelIntro';
import Copyright from '../components/Copyright';
import { FormWrapper } from './FormComponents';

const Wrapper = styled.div`
  transition: all 0.4s;
  overflow: hidden;
  position: relative;
  margin: 0 0 0 -90px;
`;
const LoginPageWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  background: ${p => p.theme.colorDarkBlue};
  padding: 50px;
  box-sizing: border-box;
  transition: all 0.5s;
`;
const BgElement = styled.div`
  background: ${p => p.theme.colorGreen};
  position: absolute;
  left: ${p => (p.activePanel == 'Login' ? '0' : 'calc(100% - 300px)')};
  top: 0;
  width: 300px;
  height: 300px;
  transition: 0.9s all ease;
  -webkit-transition: 0.9s all ease;
`;

export default class LoginSigninPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePanel: 'Login'
    };
  }

  switchTo = () => {
    if (this.state.activePanel == 'Login') {
      this.setState(() => ({
        activePanel: 'Signin'
      }));
    } else {
      this.setState(() => ({
        activePanel: 'Login'
      }));
    }
  };

  render() {
    const { activePanel } = this.state;
    return (
      <Wrapper>
        <LoginPageWrapper>
          <BgElement activePanel={activePanel} />
          <PanelIntro activePanel={activePanel} switchTo={this.switchTo} />
          <FormWrapper activePanel={activePanel}>
            {activePanel == 'Login' ? (
              <LoginForm activePanel={activePanel} />
            ) : (
              <SignupForm activePanel={activePanel} />
            )}
          </FormWrapper>
          <Copyright activePanel={activePanel} />
        </LoginPageWrapper>
      </Wrapper>
    );
  }
}
