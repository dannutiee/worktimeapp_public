import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import LoginSignupPage from '../auth/index';
import HomePage from '../home/index';
import About from '../about/index';
import defaultTheme from '../themes/theme';

const AppBody = styled.div`
  font-family: 'Montserrat', sans-serif;
`;

export const history = createHistory();

const AppRouter = () => (
  <ThemeProvider theme={defaultTheme}>
    <Router history={history}>
      <AppBody>
        <Switch>
          <Route path="/" component={LoginSignupPage} exact={true} />
          <Route path="/home" component={HomePage} exact={true} />
          <Route path="/about" component={About} exact={true} />
        </Switch>
      </AppBody>
    </Router>
  </ThemeProvider>
);

export default AppRouter;
