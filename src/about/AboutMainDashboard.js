import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: ${p => p.theme.margin};
  position: relative;
  top: ${p => p.theme.TopNav.size};
`;
const Section = styled.div`
  display: flex;
  margin-top: 30px;
  background-color: ${p => p.theme.Dashboard.backgroundColor};
`;
const Module = styled.div`
  display: flex;
  background: white;
  min-height: ${p => (p.fullHeight ? 'auto' : '350px')};
  color: lightgrey;
  width: 100%;
  box-shadow: ${p => p.theme.bottomShadow};
  padding: 20px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const AboutInfo = styled.div`
  color: #31557d;
  max-width: 600px;
  text-align: center;
`;

const LinkInfo = styled.a`
  color: ${p => p.theme.link};
  cursor: pointer;
`;

const AboutMainDashboard = () => {
  return (
    <Wrapper>
      <Section>
        <Module>
          <AboutInfo>
            <div>
              This product was designed and developed by Danuta Ludwikowska.{' '}
            </div>
            <div>
              It has been made for educational purposes and it will not be
              further developed. If you want to know more about it, please
              contact with the author via
              <LinkInfo
                href="https://www.linkedin.com/in/ludwikowska-danuta/"
                target="_blank"
              >
                {' '}
                linkedin
              </LinkInfo>{' '}
              or{' '}
              <LinkInfo
                href="https://www.facebook.com/danuta.ludwikowskaa"
                target="_blank"
              >
                facebook
              </LinkInfo>
              . You can also check
              <LinkInfo href="http://ludwikowskadanuta.pl/" target="_blank">
                {' '}
                ludwikowskadanuta.pl
              </LinkInfo>{' '}
              and{' '}
              <LinkInfo href="http://rollandscroll.pl/" target="_blank">
                rollandscroll.pl
              </LinkInfo>
              .
            </div>
            <div>
              There you can read more about the main purposes of this project
              and future ideas.{' '}
            </div>
          </AboutInfo>
          <AboutInfo>
            Copyright Danuta Ludwikowska | 2019 | All rights reserved
          </AboutInfo>
        </Module>
      </Section>
    </Wrapper>
  );
};

export default AboutMainDashboard;
