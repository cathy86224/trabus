import React, { Component } from 'react'
import Table from "./Table"
import { Bar } from 'react-chartjs-2';

export default class Chart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            time: [],
            value: [],
            display: false
        }
    }

    componentDidUpdate(prevProp) {
        if(prevProp.states.stateSelected !== this.props.states.stateSelected) {
            this.setState({
                display: false
            })
        }
        else if(prevProp.states.reservoirSelected !== this.props.states.reservoirSelected) {
            let data20 = this.props.states.data20[this.props.states.stateSelected]
            let data19 = this.props.states.data19[this.props.states.stateSelected]
            let data18 = this.props.states.data18[this.props.states.stateSelected]
            let chartData20 = this.getValues(data20)
            let chartData19 = this.getValues(data19)
            let chartData18 = this.getValues(data18)

            this.setState({
                time: chartData20[0],
                value: chartData20[1],
                display: true,
                table20: chartData20,
                table19: chartData19,
                table18: chartData18
            })
        }
    }

    getValues = (data) => {
        let valueObj = (data.filter(code => (code.sourceInfo.siteCode[0].value === this.props.states.reservoirSelected) && (code.values[0].value.length !== 0)))[0].values[0].value
        let time = [], value = [];

        for(let val of valueObj) {
            let tempVal = parseInt(val.value)
            let tempTime = val.dateTime.split('T')[0].substring(5)

            if(tempVal > 0) {
                value.push(tempVal)
                time.push(tempTime)
            }
        }

        return [time,value]
    }

    displayChartData() {
        let data = {
            labels: this.state.time,
            datasets: [
                {
                    label: "acre-feet",
                    data: this.state.value,
                    backgroundColor: "#577b94",
                }
            ]
        }

        return data
    }

    render() {
        return (
            <React.Fragment>
                {this.state.display && 
                    <div className="chart">
                        <div className="title">
                            {this.props.states.reservoirSelectedName}{" "}
                            2020 Daily Acre-Feet Values
                        </div>
                        <div className="bar-chart">
                            <Bar data={this.displayChartData()}/>
                            <Table table20={this.state.table20} table19={this.state.table19} table18={this.state.table18} resName={this.props.states.reservoirSelected}/>
                        </div>
                    </div>
                }
            </React.Fragment>
        
        )
    }
}
