import React from 'react';
import styled from 'styled-components';
import Clock from 'react-live-clock';

export const AlignFlexCenter= styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${p=>p.theme.TopNav.size};
    color: white;
`;

const TimeWidgetWrapper = styled(AlignFlexCenter)`
    position: relative;
    width: fit-content;
    padding: 0 10px;
    min-width: 400px;
    margin-right:10px;
`;

const TimeInfo = styled.div`
    color: white;
    font-size: 18px;
    white-space: nowrap;
    padding: 0 15px;
    width: ${p=>p.stickyWidth ? '70px' : ''};
    margin-right: 10px;
    :last-child{
        margin-right: unset;
        min-width: 100px;
    }
    line-height: 68px;
    border-radius: 5px;
    background: ${p=>p.theme.TopNav.Input.backgroundColor};

    width: fit-content;
`;

const TimeWidget = () => (

    <TimeWidgetWrapper>
        <TimeInfo>
            <Clock 
                date={''}
                format={' MMMM Do, YYYY'}
                timezone={'Poland'}
            />
        </TimeInfo>
        <TimeInfo>
            <Clock 
                date={''}
                format={'dddd'}
                timezone={'Poland'}
            />
        </TimeInfo>
        <TimeInfo stickyWidth>
            <Clock  
                format="HH:mm:ss" 
                ticking={true} 
                interval={1000} />
        </TimeInfo>
    </TimeWidgetWrapper>

);



export default TimeWidget;

