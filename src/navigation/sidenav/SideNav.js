import React from 'react';
import {history} from '../../_routers/AppRouter';
import styled from 'styled-components';
import { Icon  } from 'semantic-ui-react';

const SideNavWrapper = styled.div`
    background-color: ${p => p.theme.SideNav.backgroundColor};
    bottom: 0;
    left: 0;
    width: ${p => p.theme.SideNav.width};
    position: fixed;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

const Option = styled.div`
    padding: ${p=>p.theme.padding};
    font-size: ${p=>p.theme.fontSizeMedium};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${p=>p.theme.borderRadiusLight};
    margin: 15px;
    background: ${p => p.active ? p=>p.theme.blueGradient : "initial"};
    cursor: pointer;
`;

const UserLabel = styled(Option)`

`;

export class SideNav extends React.Component {
state = {
    activePanel: ""
}

componentDidMount(){
    const { path } = this.props.match;
    this.setState(()=>({
        activePanel: path.slice(1)
    }))
}

onClickNavOption = (panel) => {
    history.push(`/${panel}`)
    this.state.activePanel &&
    this.setState(()=>({
        activePanel: panel
    }))
   
}

render() {
  const { startLogout } = this.props;
  const { firstName, lastName } = this.props.user[0];
  const { activePanel } = this.state;

  return (
    <SideNavWrapper>
        <div>
            <UserLabel>
                {firstName[0].toUpperCase()}
                {lastName[0].toUpperCase()}
            </UserLabel>
        </div>
        <div>
            <Option 
                active={activePanel === 'home' || !activePanel}
                onClick={()=>this.onClickNavOption('home')}
            >
               <Icon name='chart bar outline' />
            </Option>
            <Option
                active={activePanel === 'about'}
                onClick={()=>this.onClickNavOption('about')}
            >
                <Icon name='help' />
            </Option>
        </div>
        <div >
            <Option  onClick={startLogout}>
                <Icon name='power off' />
            </Option>
        </div>
    </SideNavWrapper>
  );
}
}


export default SideNav;