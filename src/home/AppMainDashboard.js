import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import WorkWidgets from './WorkPanel/WorkWidgets';
import TasksTable from './TasksList/TasksTable';
import WorkTimeChart from './WorkTimeChart/WorkTimeChart';

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
  height: ${p => (p.fullHeight ? 'auto' : '350px')};
  min-height: ${p => (p.fullHeight ? '500px' : 'auto')};
  color: lightgrey;
  width: 100%;
  box-shadow: ${p => p.theme.bottomShadow};
`;

const AppMainDashboard = props => {
  const { work, tasks } = props;

  return (
    <Wrapper>
      <Section>
        <Module>
          <WorkTimeChart work={work} />
        </Module>
        <WorkWidgets work={work} tasks={tasks} />
      </Section>
      <Section>
        <Module fullHeight>
          <TasksTable match={props.match} />
        </Module>
      </Section>
    </Wrapper>
  );
};

const mapStateToProps = state => {
  return {
    work: state.work,
    tasks: state.tasks
  };
};

export default connect(mapStateToProps)(AppMainDashboard);
