import React from 'react';
import styled, { keyframes } from 'styled-components';
import AnimateStyled from 'animate-styled';

const IntroWrapper = styled.div`
  width: 50%;
  box-sizing: border-box;
  position: absolute;
  height: calc(100% - calc(2*${p => p.theme.IntroPanel.padding}));
  left: ${p =>
    p.activePanel == 'Login' ? p.theme.IntroPanel.padding : 'calc(50% - 50px)'};
  z-index: 1;
  background-image: ${p =>
    p.activePanel == 'Login'
      ? 'url(images/bg-login.jpg)'
      : 'url(images/bg-signup.jpg)'};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: ${p => p.theme.IntroPanel.padding};
  color: white;
  font-size: ${p => p.theme.headers.h1.fontSize}
  box-shadow: ${p =>
    p.activePanel == 'Login' ? p.theme.leftTopShadow : p.theme.rightTopShadow};
  flex-direction: column;
  justify-content: center;
  align-items: ${p => (p.activePanel == 'Login' ? 'flex-start' : 'flex-end')};
  display: flex;
  transition: .9s all ease;
  -webkit-transition: .9s all ease;

`;

const IntroContent = styled.div`
  position: absolute;
  min-width: 600px;
  transition: opacity 2s ease;
  opacity:0;
  font-size: 35px;
  left: ${p => (p.activePanel == 'Login' ? '200%' : '-200%')};
  &.true{
    opacity:1;
    left:  ${p => (p.activePanel == 'Login' ? '50px' : '')};
    right:  ${p => (p.activePanel != 'Login' ? '50px' : '')};
  }
}
`;

const IntroLogin = styled.div`
  margin: 25px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const IntroSignup = styled(IntroLogin)`
  justify-content: flex-end;
`;
const CheckoutButton = styled.div`
  background: white;
  padding: 15px 40px;
  border-radius: ${p => p.theme.borderRadius};
  color: ${p => p.theme.colorBlue};
  display: flex;
  align-items: center;
  font-size: 22px;
  margin: 0 25px;
  cursor: pointer;
  text-transform: uppercase;
`;

class PanelIntro extends React.Component {
  render() {
    const { activePanel, switchTo } = this.props;
    const showContent = activePanel == 'Login' ? true : false;
    const notShow = !showContent;

    return (
      <IntroWrapper activePanel={activePanel}>
        <IntroContent className={showContent} activePanel={activePanel}>
          <IntroLogin>Don't have an account ?</IntroLogin>
          <IntroLogin>
            Let's <CheckoutButton onClick={switchTo}>Sign up</CheckoutButton> !
          </IntroLogin>
        </IntroContent>
        <IntroContent className={notShow} activePanel={activePanel}>
          <IntroSignup>Already have an account ?</IntroSignup>
          <IntroSignup>
            Let's <CheckoutButton onClick={switchTo}>Log in</CheckoutButton> !
          </IntroSignup>
        </IntroContent>
      </IntroWrapper>
    );
  }
}

export default PanelIntro;
