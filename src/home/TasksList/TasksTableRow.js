import React from 'react';
import moment from 'moment';
import { TableRow, TableCell} from '../../components/Table'
import { convertMS } from "../../helpers/convertMs";
import { returnHTMLTime } from "../../helpers/convertMs";
import ActionButtons from './ActionButtons';


const calculateTheWorkTime = (createdAt, pauseTime) => {

        const today =  moment().format('x');
        const convertedTime = convertMS(today - createdAt - pauseTime);  
        //console.log('convertedTime', convertedTime)     
        return returnHTMLTime(convertedTime)
}


class  TasksTableRow extends React.Component {
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

        const { tasks} = this.props;
        return(tasks.map((task, key) =>{
            const isDisabled = !!(task.status === 'paused' || task.status === 'done') 

            return(
                <TableRow key={key}>
                    <TableCell stickyWidth isDisabled={isDisabled}>
                        {task.name}
                    </TableCell>
                    <TableCell isDisabled={isDisabled}>
                        {task.status !== 'paused' && task.status !== 'done' && calculateTheWorkTime(task.createdAt, task.pauseTime)}
                        {task.status === 'paused' && 'PAUSED'}
                        {task.status === 'done' && returnHTMLTime(convertMS(task.workTime), task.status)} 
                    </TableCell>
                    <TableCell isDisabled={isDisabled}>
                        {task.finishedAt ? "FINISHED" : <ActionButtons task={task}/>}
                </TableCell>
                </TableRow>
            )
        }))
    }
}

export default TasksTableRow;