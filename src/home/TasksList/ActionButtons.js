import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';
import Alignment from '../../components/Alignment';
import { Icon  } from 'semantic-ui-react';
import { startEditTask, startDeleteTask } from '../../_actions/tasks';
import { startEditWork } from '../../_actions/work';
import { ActionButton  } from '../../components/Buttons';
import ComfirmationModal from '../WorkPanel/ComfirmationModal';

const ButtonsWrapper = styled(Alignment)`
    border: 1px solid ${p=>p.theme.colorBlue};
    border-radius: ${p=>p.theme.borderRadiusLight};
    width: fit-content;
`;

export const updateTaskInWork = (task,work, action, startEditWork) => {
    const currentWork =  work.find(item => ( 
        item.status === 'active'
    )) 

    if(currentWork){
        const currwentWorkID = currentWork.id;
        const now =  moment().format('x');

        if(currentWork.tasks){
            const allTasks = currentWork.tasks;
            const taskToUpdate = currentWork.tasks.find(el=>el.name === task.name);
            const indexOfTaskToUpdate = currentWork.tasks.indexOf(taskToUpdate);
            
            if( action === 'play'){
                if( taskToUpdate){
                    allTasks[indexOfTaskToUpdate].startedAt =  now;
                    allTasks[indexOfTaskToUpdate].status =  'active' ;
                }else{
                    currentWork.tasks.push({
                        "name": task.name,
                        "startedAt":  moment().format('x'),
                        "time": 0,
                        "status": "active"
                    })
                }
            }
        
            if( action === 'paused'){
                let workTime =  allTasks[indexOfTaskToUpdate].time + ( now -  allTasks[indexOfTaskToUpdate].startedAt )
                allTasks[indexOfTaskToUpdate].time =  workTime ;
                allTasks[indexOfTaskToUpdate].status =  'paused' ;
            }
        
            const updates = { tasks: [
                ...allTasks
            ]}
            startEditWork(currwentWorkID, updates)
        }else{
            if( action === 'play'){
                const updates = { tasks: [
                    {
                        "name": task.name,
                        "startedAt":  moment().format('x'),
                        "time": 0,
                        "status": "active"
                    }
                ]}
                startEditWork(currwentWorkID, updates)
            }

        }
    }
}

export const onClickPlay = (task, startEditTask, freezStatus, work, startEditWork) => {
    const { id, status, pausedAt, pauseTime,createdAt } = task
    let newStatus = status === 'paused' ? 'active' : status;
    let label = freezStatus ? freezStatus : '-';

    if(status !== 'active'){
        let today =  moment().format('x');

        let calculatedPauseTime = today - pausedAt + pauseTime;
        let calculatedWorkTime = today - createdAt - pauseTime;

        const updatedTask = { 
            status: newStatus, 
            pauseTime: calculatedPauseTime, 
            pausedAt: 0 , 
            label: label,
            workTime: calculatedWorkTime
        };

        startEditTask(id, updatedTask)

        updateTaskInWork(task, work, 'play', startEditWork)
    }
}


export const onClickPause = (task,startEditTask, freezStatus, work, startEditWork) => {
    const { id , status } = task;
    let newStatus = status === 'active' ? 'paused' : status;
    let label = freezStatus ? freezStatus : '-';
    if( status !== 'paused'){
        const updatedTask = { 
            status: newStatus, 
            pausedAt:  moment().format('x') , 
            label:label  
        };
        startEditTask(id, updatedTask)
        updateTaskInWork(task, work, 'paused', startEditWork)
    }
}


class ActionButtons  extends React.Component {
    state = {
        finalizeModalOpen: false ,
        deleteModalOpen: false,
    }

    handleOpenFinazlizeModal = () => this.setState({ finalizeModalOpen: true })
    handleCloseFinalizeModal = () => this.setState({ finalizeModalOpen: false })

    handleOpenDeleteModal = () => this.setState({ deleteModalOpen: true })
    handleCloseDeleteModal = () => this.setState({ deleteModalOpen: false })
   
    onClickDelete = (id, startDeleteTask, startEditWork, task) => {

        const currentWork =  this.props.work.find(item => ( 
            item.status === 'active'
        )) 
        if( currentWork){
            const currwentWorkID = currentWork.id;
            const updatedTasks =  currentWork.tasks.filter(el=>el.name !== task.name)
             const updates = {
                 tasks: [
                     ...updatedTasks
                 ]
             }
             startEditWork(currwentWorkID, updates)
        }

        startDeleteTask({ id: id });
        this.handleCloseDeleteModal()
    }

    onClickFinalize = (id, startEditTask) => {
        const { task } = this.props;
        let finishedAt =  moment().format('x');
    
        let calculatedWorkTime =  finishedAt - task.createdAt - task.pauseTime;
        let calculatedTotalTime = finishedAt - task.createdAt; 
        const updatedTask = { status: 'done', finishedAt:  moment().format('x') , pausedAt: 0 , workTime: calculatedWorkTime, totalTime: calculatedTotalTime};
        startEditTask(id, updatedTask)
        this.handleCloseFinalizeModal()
    }

    render(){
        const {task, work, startEditTask, startDeleteTask, startEditWork } = this.props;
        const { id, status } = task;

        return(
            <ButtonsWrapper vertical='center' horizontal='center'>
                <ActionButton 
                    active={!!(status === 'active' )}
                    onClick = {()=>onClickPlay(task, startEditTask, "-",work, startEditWork)}
                >
                    <Icon name='play' />
                </ActionButton>
                <ActionButton 
                    active={!!(status === 'paused' )}
                    onClick = {()=>onClickPause(task, startEditTask, "-",work, startEditWork)}
                >
                    <Icon name='pause' />
                </ActionButton >
                <ComfirmationModal
                    handleReject={()=>this.handleCloseFinalizeModal() }  
                    handleAccept={()=>this.onClickFinalize(id, startEditTask) }  
                    modalOpen={this.state.finalizeModalOpen}
                    content={`You are about to finalize this task.`}
                >
                    <ActionButton 
                        active={!!(status === 'done' )}
                        onClick={this.handleOpenFinazlizeModal}
                    >
                        <Icon name='check' />
                    </ActionButton>
                </ComfirmationModal>
                <ComfirmationModal
                    handleReject={()=>this.handleCloseDeleteModal() }  
                    handleAccept={()=>this.onClickDelete(id, startDeleteTask, startEditWork, task)}  
                    modalOpen={this.state.deleteModalOpen}
                    content={`You are about to delete this task.`}
                >
                    <ActionButton onClick={this.handleOpenDeleteModal}>
                        <Icon name='delete' />
                    </ActionButton>
                </ComfirmationModal>
            </ButtonsWrapper>
        )
    }

}

    const mapStateToProps = state => {
        return {
        work: state.work,
        };
    };

  const mapDispatchToProps = (dispatch, props) => ({
    startEditTask: (id, task) => dispatch(startEditTask(id, task)),
    startDeleteTask: (id) => dispatch(startDeleteTask(id)),
    startEditWork: (id, work) => dispatch(startEditWork(id, work)),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ActionButtons);

