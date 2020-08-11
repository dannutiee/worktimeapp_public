import React from 'react';
import { Redirect } from 'react-router';
import { injectGlobal } from 'styled-components';
import { connect } from 'react-redux';
import globalStyles from '../components/globalStyles';
import { startLogout } from '../_actions/authentication';
import TopNav from '../navigation/topnav/TopNav';
import { SideNav } from '../navigation/sidenav/SideNav';
import AboutMainDashboard from './AboutMainDashboard';

// Global Styles used across the entire app
injectGlobal`${globalStyles}`;

export class About extends React.Component {
  render() {
    const { startLogout } = this.props;
    if (this.props.auth.isLoggedOut === 'loggedout') {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <TopNav />
        <SideNav
          startLogout={startLogout}
          match={this.props.match}
          user={this.props.user}
        />
        <AboutMainDashboard match={this.props.match} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    work: state.work,
    auth: state.authentication
  };
};

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
