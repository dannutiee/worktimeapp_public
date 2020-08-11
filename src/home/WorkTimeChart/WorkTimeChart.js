import React from 'react';
import Chart from '../../chart/Chart';
import { convertMS } from "../../helpers/convertMs";
import moment from 'moment';
import Alignment from '../../components/Alignment';
import ChartHeader from './ChartHeader';

class WorkTimeChart extends React.Component {
    state = {
        workTimeRange: 'week',
        rangeDays: 7,
        weekIndex: 0,
        monthIndex: 0,
    }

    getTheCurrentWeekDays = () => {

        let startOfWeek = moment().subtract(this.state.weekIndex, 'weeks').startOf('isoWeek')
        let endOfWeek =moment().subtract(this.state.weekIndex, 'weeks').endOf('isoWeek')

        let days = [];
        let day = startOfWeek;

        while (day <= endOfWeek) {
            days.push(day.format('YYYY-MM-DD'));
            day = day.clone().add(1, 'd');
        }

        return days
    }

    getTheCurrentMonthDays = () => {

        let startOfMonth = moment().subtract(this.state.monthIndex, 'months').startOf('month')
        let endOfMonth = moment().subtract(this.state.monthIndex, 'months').endOf('month')

       // console.log('startOfMonth', startOfMonth, 'endOfMonth', endOfMonth)

        let days = [];
        let day = startOfMonth;

        while (day <= endOfMonth) {
            days.push(day.format('YYYY-MM-DD'));
            day = day.clone().add(1, 'd');
        }
        return days
    }


      groupBy = (data, prop) => {
        return data.reduce(function(groups, item) {
          const val = item[prop]
          groups[val] = groups[val] || []
          groups[val].push(item)

          return groups
        }, {})
      }
    
      
      groupedWork = this.groupBy(this.props.work , 'date');   

      filterTheDates = () => {
            let daysFiltered= this.state.workTimeRange !== 'week' ? (
            Object.keys(this.groupedWork).filter( el=>{
                    return this.getTheCurrentMonthDays().includes( el );
            } ) ): (
                Object.keys(this.groupedWork).filter( el=>{
                        return this.getTheCurrentWeekDays().includes( el );
                } )
            )
              return daysFiltered
      }
      
        groupedKeys = this.filterTheDates();
     
    countWorkTime = (key) => {
        let workTime = 0;
        for(let item of this.groupedWork[key]){
            workTime += item.workTime
        }
      
        return convertMS(workTime).hourDecimal
    }

    groupTasksInWorkday = () => {
        let tasksData= [];
        let tasksPerDay = {}

        let groupedKeys = this.filterTheDates();
        for( let day of groupedKeys){
            for( let work of  this.groupedWork[day] ){
                if(work.tasks){

                    for ( let task of work.tasks){
                        if( !tasksData.find(el=>el.name===task.name)){
                            tasksData.push({
                                name: task.name,
                                time: convertMS(task.time).hourDecimal
                            })
                            
                        }else{
                            let finded = tasksData.find(el=>el.name===task.name);
                            finded.time =  finded.time + convertMS(task.time).hourDecimal
                        }
                    }
                }
            }
            tasksPerDay[day] = tasksData
            tasksData = []
        }

        return tasksPerDay;
        
    }
    

    setDataForChart = (range) => {
        const taskInWorkDay = this.groupTasksInWorkday();

       let  groupedKeys = this.filterTheDates();
        let dataForChart = [];
        let obj = {}
        for( let key of groupedKeys){
            
            obj['id']= key
            obj['title'] =  moment(key).format("YYYY-MM-DD")
            obj['value'] = {};
            obj['value'].time = this.countWorkTime(key)
            
            dataForChart.push(obj)
            obj={}
        }  
 
        let daysWithNoWork = this.state.workTimeRange === 'week' ? 
        this.getTheCurrentWeekDays().filter( el=>{
            return !groupedKeys.includes( el );
        } ) :
        this.getTheCurrentMonthDays().filter( el=>{
            return !groupedKeys.includes( el );
        } ) 

        for( let day of daysWithNoWork){
            dataForChart.push({id:moment(day).format("YYYY-MM-DD") ,title: day, value: {time: 0}})
        }

        for(let day in taskInWorkDay){
            let i = 1;
                for( let el of taskInWorkDay[day]){
                    dataForChart.find(data=>data.id === day) ["value"+i] = {
                        "name": el.name,
                        "time": el.time
                    }
                    i++;
                }
           i= 1
        }

        let sortedDataForChart = dataForChart.sort((a, b) => (a.title > b.title) ? 1 : -1)
        let dataForChartBetween = sortedDataForChart.slice(dataForChart.length-range, dataForChart.length);

        for( let obj in dataForChartBetween){
            this.state.workTimeRange === 'week' ? 
            dataForChartBetween[obj].title =  moment(dataForChartBetween[obj].title).format('ddd DD-MM') :
            dataForChartBetween[obj].title =  moment(dataForChartBetween[obj].title).format('DD')

        }
   
        return dataForChartBetween
    }
   
    toggleWorkTimeRange = (range, days) => {
        this.setState(()=>({
            workTimeRange: range,
            rangeDays: days
        }))
    }

    toggleWeekIndex = (index) => {
        this.setState(()=>({
            weekIndex: index,
        }))
    }
    toggleMonthIndex = (index) => {
        this.setState(()=>({
            monthIndex: index,
        }))
    }

    render(){
        const { workTimeRange } =this.state;
     
        return(
            <Alignment direction="column">
                <ChartHeader 
                    toggleWorkTimeRange={this.toggleWorkTimeRange} 
                    toggleWeekIndex={this.toggleWeekIndex}
                    toggleMonthIndex={this.toggleMonthIndex}
                    workTimeRange={workTimeRange}
                    data = {this.setDataForChart(this.state.rangeDays) }
                />
                <Chart data={this.setDataForChart(this.state.rangeDays)} />
            </Alignment>
        )
    }
}

export default WorkTimeChart;