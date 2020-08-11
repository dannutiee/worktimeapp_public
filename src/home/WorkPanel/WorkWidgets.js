import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Widget from '../../components/Widget';
import WorkActionButtons from './WorkActionButtons';
import { convertMS } from "../../helpers/convertMs";
import { returnHTMLTime } from "../../helpers/convertMs";

const ModuleWidgets = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  margin-left: ${p => p.theme.margin};
  display: flex;
  justify-content: space-around;
`;

class WorkWidgets extends React.Component {
    constructor(props) {
        super(props),
        this.state = {
            timer: true
        }
        this.setTimer = this.setTimer.bind(this)
    }

    setTimer(){
        this.setState(()=> ({ timer: !this.state.timer}))
    }
    componentDidMount() {
        this.timer = setInterval(this.setTimer, 10000);
    }
    componentWillUnmount(){
       clearInterval( this.timer);
    }


    render(){
        const { work, tasks } =this.props;
        const now = moment().format('x');
        const currentWork = work.find(item=>(item.status === 'active'));
        const workStarted = currentWork ? moment(currentWork.startedAt, "x").format("HH:mm") : '-'; 
        const timeAtWork = currentWork ? returnHTMLTime(convertMS(now - currentWork.startedAt)) : '-';

        return(
            <ModuleWidgets>
                    <Widget
                    icon="fas fa-flag-checkered"
                    label="Work started"
                    content={workStarted}
                    />
                    <Widget 
                    icon="far fa-clock" 
                    label="Time at wokrk" 
                    content={timeAtWork} 
                    />
                <WorkActionButtons work={work} tasks={tasks} />
            </ModuleWidgets>
        )
    }
}

export default WorkWidgets;


