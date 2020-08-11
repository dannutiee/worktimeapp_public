import React, {Fragment} from 'react'; 
import {connect} from 'react-redux';
import moment from 'moment';
import { PrimaryButton as ActionButton } from '../../components/Buttons';
import { startAddNewWork, startEditWork } from '../../_actions/work'; 
import { startEditTask } from '../../_actions/tasks';
import ComfirmationModal from './ComfirmationModal';
import { onClickPlay , onClickPause} from '../TasksList/ActionButtons';

class WorkActionButtons extends React.Component {
    state = {
        workStatus : false,
        modalOpen: false 
      }

    freezActiveTasks = () => {
       const { tasks, startEditTask, work, startEditWork } = this.props;
       const freezStatus = 'freezed';
       const pausedTasks = tasks.filter(task=>task.status === 'active');
       pausedTasks.forEach(task => (
            onClickPause(task, startEditTask, freezStatus, work, startEditWork)
       ));
    }

    unfreezPausedTasks = () => {
        const { tasks, startEditTask, work, startEditWork } = this.props;
        const freezStatus = '-';
        const freezedTasks = tasks.filter(task=>task.label === 'freezed');
        freezedTasks.forEach(task => (
            onClickPlay(task, startEditTask, freezStatus, work, startEditWork)
        ));
    }

    getCurrentTasks = () => {
        let tasks = [];
        let freezed = this.props.tasks.filter(task=>task.label === 'freezed')

        for( let task of freezed){
            tasks.push({
                "name": task.name,
                "startedAt":  moment().format('x'),
                "time": 0,
                "status": "active"
            })
        }
        return tasks
    }

    onWorkStart = () => {
        const workToAdd = {
                startedAt: moment().format('x'),
                date: moment().format("YYYY-MM-DD"),
                status: 'active',
                tasks: this.getCurrentTasks()
        }
        this.setState(()=>({
            workStatus : true,
        }))
        this.unfreezPausedTasks();
        return this.props.startAddNewWork(workToAdd)   
    }

    onWorkStop = () => {
       const currentWork =  this.props.work.find(item => ( 
            item.status === 'active'
        )) 
        const currwentWorkID = currentWork.id;
        const workToUpdateOnFinish = {
            finishedAt: moment().format('x'),
            workTime: moment().format('x') - currentWork.startedAt,
            status: 'inactive',
        }
        this.setState(()=>({
            workStatus : false,
        }))
        this.freezActiveTasks()
    
        return this.props.startEditWork(currwentWorkID,workToUpdateOnFinish)
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = (onWorkStop) => (
        onWorkStop && onWorkStop(),
        this.setState({ modalOpen: false })
        )

    componentDidMount(){
        if(this.props.work.find(item => ( 
            item.status === 'active'
        )) ) {
            this.setState(()=>({
                workStatus : true,
            }))
        }
    }
    

    render(){
        return(
                <Fragment>
                    {this.state.workStatus ?  
                        <ComfirmationModal  
                            handleReject={()=>this.handleClose() }  
                            handleAccept={()=>this.handleClose(this.onWorkStop) }  
                            modalOpen={this.state.modalOpen}
                            content={`When you FINISH WORK, your active tasks will be paused.
                            We will play them when you START WORK again.`}
                        > 
                            <ActionButton  onClick={this.handleOpen}>Finish work</ActionButton>  
                        </ComfirmationModal>
                    : 
                    <ComfirmationModal  
                            handleReject={()=>this.handleClose() }  
                            handleAccept={()=>this.handleClose(this.onWorkStart) }  
                            modalOpen={this.state.modalOpen}
                            content={` When you START WORK, your tasks which was stopped on FINISH WORK
                            will revert as active. You can pause them manually if you want to.`}
                        > 
                            <ActionButton onClick={this.handleOpen}>Start work</ActionButton>  
                        </ComfirmationModal>
                    }
                </Fragment>

        )
    }
}

const mapDispatchToProps = (dispatch) => ( {
    startAddNewWork: (work) => dispatch(startAddNewWork(work)),
    startEditWork: (id, work) => dispatch(startEditWork(id, work)),
    startEditTask: (id, task) => dispatch(startEditTask(id, task)),
})

export default connect(null, mapDispatchToProps)(WorkActionButtons);
