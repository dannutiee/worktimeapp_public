import React from 'react';
import styled from 'styled-components';
import Alignment from '../../components/Alignment';
import { SingleActionButton } from '../../components/Buttons';


const HeaderWrapper = styled.div`
padding: ${p=>p.theme.padding};
width: 100%;
padding-bottom: 10px;
`;

const TableTitle = styled.div`
    font-size: ${p=>p.theme.headers.h3.fontSize};
    text-transform: uppercase;
    color: ${p=>p.theme.headers.h3.color};
    width: 100%;
    padding-bottom: 5px;
    border-color: ${p=>p.theme.headers.border};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.div`
    width: 100%;
`;

const FilterButton = styled(SingleActionButton)`
    width: 120px;
    text-align: center;
`;


const TaskTableHeader = (props) => {
    const { setFilter } = props;

    const onClickFilter = (filter) => {
        setFilter(filter);
    }
    return(
        <HeaderWrapper>
            <TableTitle>
                <Alignment>
                    <Title>Task List</Title>
                    <Alignment horizontal='flex-end'>
                        <FilterButton  onClick={()=>onClickFilter('all')}>All</FilterButton>
                        <FilterButton disabled onClick={()=>onClickFilter('active')}>Active</FilterButton>
                        <FilterButton disabled onClick={()=>onClickFilter('paused')}>Paused</FilterButton>
                        <FilterButton disabled onClick={()=>onClickFilter('done')}>Completed</FilterButton>
                    </Alignment>
                </Alignment>
            </TableTitle>   
         </HeaderWrapper>
    )
}

export default TaskTableHeader;