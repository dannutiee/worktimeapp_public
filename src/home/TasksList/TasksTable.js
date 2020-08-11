import React from 'react';
import { connect } from 'react-redux';
import { Table, TableHeader, HeaderRow } from '../../components/Table';
import TasksTableRow from './TasksTableRow';
import TaskTableHeader from './TaskTableHeader';
import Alignment from '../../components/Alignment';


class  TasksTable extends React.Component {
    state = {
        filter: 'all'
    }
    setFilter = (filter) => {
        this.setState(()=>({
            filter: filter
        }))
    }

    render(){
        const {tasks, match} = this.props;
        const { filter } = this.state;
        const sortedTasks = tasks.sort((a, b) => a.createdAt.localeCompare(b.createdAt)).reverse();
        const showAll = filter === 'all'
        let filteredTasks = sortedTasks;

        if(!showAll){
                filteredTasks = sortedTasks.filter(task =>task.status === filter)
        }

        return(
            <Alignment direction="column" horizontal="flex-start">
                <TaskTableHeader setFilter={this.setFilter}/>
                <Table>
                    <tbody>
                    <HeaderRow>  
                        <TableHeader>
                            Task Name
                        </TableHeader>
                        <TableHeader>
                            Time
                        </TableHeader>
                        <TableHeader>
                            Action
                        </TableHeader>
                    </HeaderRow>
                    <TasksTableRow tasks={filteredTasks} match={match}/>
                    </tbody>
                </Table>
            </Alignment>
        )
    }
};


const mapStateToProps = (state) => {
    return{
        tasks: state.tasks
    }
}


export default connect(mapStateToProps)(TasksTable);