import React from 'react';
import styled from 'styled-components';
import TimeWidget from './TimeWidget';
import { AlignFlexCenter } from './TimeWidget';
import moment from 'moment';
import {connect} from 'react-redux';
import { startAddNewTask } from '../../_actions/tasks'; 
import { startEditWork } from '../../_actions/work'; 
import momentDurationPlugin from 'moment-duration-format'
momentDurationPlugin(moment);
import WarningModal from '../../components/WarningModal';
import { Icon  } from 'semantic-ui-react';

const TopNavWrapper = styled(AlignFlexCenter)`
    width: calc(100% - ${p=>p.theme.TopNav.size});
    margin:0px; 
    position: fixed;
    z-index: 100;
    top:0px;
    justify-content: space-between;
    background: ${p=>p.theme.TopNav.backgroundColor};
`;

const AddInputWrapper = styled(AlignFlexCenter)`
    position: relative;
    width:100%;
    margin-left: ${p=>p.theme.padding};
    margin-right: ${p=>p.theme.padding};
`;
const AddInput = styled.input`
    width: 100%;
    background: ${p=>p.theme.TopNav.Input.backgroundColor};
    border-radius: ${p=>p.theme.borderRadius};
    padding: ${p=>p.theme.padding};
    color: white;
    font-size: ${p=>p.theme.TopNav.Input.fontSize};
    ::placeholder{
        color: white;
    }
    :focus{
        box-shadow: inset 0px 0px 0px 1px rgb(18, 217, 210);
    }
`;

const AddButton =  styled(AlignFlexCenter)`
    min-width:  70px;
    border: none;
    color: white;
    cursor: pointer;
    margin-left: 30px;
    position: absolute;
    right: 0px;
`;



class TopNav extends React.Component {
    state = {
        taskToAdd: {
            name: '',
            createdAt: 0,
            workTime : 0,
            totalTime: 0,
            status: 'active',
            pausedAt: 0,   // this will be updated after every new click pause
            pauseTime: 0,  
            label: '', 
        },
        warningModalOpen: false 
    }
  
    handleOpenModal = () => this.setState({ warningModalOpen: true })
  
    handleCloseModal = () => this.setState({ warningModalOpen: false })

    addTaskToActiveWork = (task) => {
        const { startEditWork } = this.props;
        const currentWork =  this.props.work.find(item => ( 
            item.status === 'active'
        )) 
        const currwentWorkID = currentWork.id;
        
        const updates = currentWork.tasks ? {
            tasks: [
                 ...currentWork.tasks,
                {
                    "name": task.name,
                    "startedAt":  moment().format('x'),
                    "time": 0,
                     "status": "active"
                    
                }
            ]
        } : {
            tasks: [
               {
                   "name": task.name,
                   "startedAt":  moment().format('x'),
                   "time": 0,
                   "status": "active"
                   
               }
           ]
        }
        startEditWork(currwentWorkID, updates)
    }

    onClickAddNewTask = (taskToAdd) => {
        const { work, startAddNewTask, startEditWork } =this.props;
        if(taskToAdd.name.length > 0){
            if (work.find(item => item.status === 'active')){
                startAddNewTask(taskToAdd);
                this.addTaskToActiveWork(taskToAdd)
              
            }else{
                this.handleOpenModal()
            }
        }
    }

render() {
   const { taskToAdd, warningModalOpen } = this.state;

   //TODO
    const updateTaskToAdd = (e) =>{
        const newTaskToAdd = e.target.value;
        const today =  moment().format('x');
        this.setState(()=> ({ taskToAdd: {  name: newTaskToAdd , createdAt: today} }))
    } 

  return (
    <TopNavWrapper>
        <AddInputWrapper>
            <AddInput onChange={updateTaskToAdd} placeholder="What are you working on ...?"  />
            <WarningModal warningModalOpen={warningModalOpen} onClose={this.handleCloseModal} content={'Please start your work before adding a new task'}>
                    <AddButton onClick={() => this.onClickAddNewTask(taskToAdd)}>
                        <Icon name="play" size="large"/>
                    </AddButton>
            </WarningModal>
        </AddInputWrapper>
       <TimeWidget />
    </TopNavWrapper>
  );
}
}

const mapStateToProps = state => {
    return {
      work: state.work,
    };
  };

const mapDispatchToProps = (dispatch) => ( {
    startAddNewTask: (task) => dispatch(startAddNewTask(task)),
    startEditWork: (id, work) => dispatch(startEditWork(id, work)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);

