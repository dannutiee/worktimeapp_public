import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { SingleActionButton } from '../../components/Buttons';
import Alignment from '../../components/Alignment';
import { convertToHM } from '../../helpers/covertDecimalToTime';


const HeaderWrapper = styled.div`
    padding: ${p=>p.theme.padding};
    width: 100%;
    padding-bottom: 0px;
`;

const ChartTitle = styled.div`
    font-size: ${p=>p.theme.headers.h3.fontSize};
    text-transform: uppercase;
    color: ${p=>p.theme.headers.h3.color};
    width: 100%;
    padding-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ButtonsWrapper = styled(Alignment)`
    width: fit-content;
`;

const ChartDetails = styled(Alignment)`
    
`;

const Info = styled.span`
    color: ${p=>p.theme.colorDarkBlue};
    text-transform: uppercase;
    padding: 10px;

`;
const Digit = styled.span`
    color: ${p=>p.theme.colorBlue}
`;

const ChartNavTitle = styled.span`
    margin: 0 10px;
`;

const Icon = styled.i`
    width: 20px;
    text-align: center;
    cursor:  ${p=>p.active ? 'pointer' : p.cursor};
    color: ${p=>p.active ? p.theme.headers.h3.color : '#dedede'};
    display: block;
`;

class ChartHeader extends React.Component {
    state = {
        weekIndex: 0,
        monthIndex: 0
    }

    onClickPrev = (type, direction) => {
        const {weekIndex, monthIndex } = this.state; 
        let allowToIncrementWeek = !(direction === 'right' && weekIndex === 0);
        let allowToIncrementMonth = !(direction === 'right' && monthIndex === 0);

        if( type === 'week' && allowToIncrementWeek){
            let newWeekIndex = direction === 'left' ? weekIndex + 1 : weekIndex - 1;
            this.props.toggleWeekIndex(newWeekIndex)
            this.setState(()=>({
                weekIndex: newWeekIndex,
            }))
            
        }else if (type === 'month'  && allowToIncrementMonth){
            let newMonthIndex =  direction === 'left' ? monthIndex + 1 : monthIndex - 1 ;
            this.props.toggleMonthIndex(newMonthIndex)
            this.setState(()=>({
                monthIndex: newMonthIndex ,
            }))
        }

    }

    getTheMaxValue = (data, type) => {
        let timeInfo = {
            max: 0,
            min: 0,
            total: 0
        };
        for( let el of data ){
            if( el.value.time > timeInfo.max){
                timeInfo.max =  el.value.time;
                timeInfo.min =  el.value.time;
            }
            timeInfo.total =  timeInfo.total  + el.value.time;
        }
        for( let el of data ){
            if( el.value.time !== 0 && el.value.time < timeInfo.min ){
                timeInfo.min =  el.value.time;
            }
        }

        if( timeInfo[type] === 0) {
            return "0 H"
        }else{
            return convertToHM(timeInfo[type]);
        }

    }
    
    render(){
        const { 
        toggleWorkTimeRange,
        workTimeRange,
        data
        } = this.props;

        this.getTheMaxValue(data)

        const currentMonthDaysAmount = moment(moment().subtract(this.state.monthIndex, "month").startOf("month").format('YYYY-MM'), "YYYY-MM").daysInMonth() // 31
        const currnetMonthName = moment().subtract(this.state.monthIndex, "month").startOf("month").format('MMMM YYYY');
        const currnetWeekStart = moment().subtract(this.state.weekIndex, "week").startOf("isoWeek").format('DD MMM');
        const currnetWeekEnd = moment().subtract(this.state.weekIndex, "week").endOf("isoWeek").format('DD MMM');
        const allowToIncrement = workTimeRange === 'week' && this.state.weekIndex > 0 || workTimeRange === 'month' && this.state.monthIndex > 0;

        return(
            <HeaderWrapper>
                 <ChartTitle>
                    <span>{workTimeRange === 'week' ? 'Weekly workflow' : 'Monthly workflow'} </span>
                    <Alignment horizontal="center" width="fit-content">
                         <Icon onClick={()=>this.onClickPrev(workTimeRange, 'left')} active>
                            <i className="fa fa-angle-left" aria-hidden="true"></i>
                         </Icon>
                         <ChartNavTitle >{workTimeRange === 'week' ? `${currnetWeekStart} - ${currnetWeekEnd}` : currnetMonthName}</ChartNavTitle>
                         <Icon onClick={()=>this.onClickPrev(workTimeRange, 'right')} active={allowToIncrement}>
                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                         </Icon>
                    </Alignment>
                    <ButtonsWrapper>
                        <SingleActionButton 
                            disabled={workTimeRange !== 'week'}  
                            onClick={()=>toggleWorkTimeRange('week', 7)}>
                                week
                        </SingleActionButton>
                        <SingleActionButton 
                            disabled={workTimeRange !== 'month'} 
                            onClick={()=>toggleWorkTimeRange('month', 30)}>
                                month
                        </SingleActionButton>
                    </ButtonsWrapper>
                 </ChartTitle>
                 <ChartDetails horizontal="center">
                        <Info>Total hours: <Digit>{this.getTheMaxValue(data, 'total')}</Digit></Info>
                        <Info>Minimum: <Digit>{this.getTheMaxValue(data, 'min')}</Digit></Info>
                        <Info>Maximum: <Digit>{this.getTheMaxValue(data,'max')}</Digit></Info>
                 </ChartDetails>
            </HeaderWrapper>
           
        )
    }
}


export default ChartHeader;