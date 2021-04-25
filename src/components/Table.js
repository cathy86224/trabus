import React, { Component } from 'react'
import {monthNames, years} from "./Data"

export default class Table extends Component {

    constructor(props) {
        super(props)
        this.state = {
            avg20: [],
            avg19: [],
            avg18: []
        }
    }

    componentDidUpdate(prevProp) {
        if(prevProp !== this.props) {
            this.updateTableValue()
        }
    }

    componentDidMount() {
        this.updateTableValue()
    }

    updateTableValue() {
        this.averageMonth(this.props.table20, "20")
        this.averageMonth(this.props.table19, "19")
        this.averageMonth(this.props.table18, "18")
    }

    averageMonth = (data, year) => {
        let avgArr = new Array(12).fill(0);
        let timeArr = [...data[0]], valArr = [...data[1]];

        for(let month = 0; month < 12; month++) {
            let val = 0, monthCount = 0
            while(timeArr.length !== 0) {
                let curMonth = parseInt(timeArr[0].split("-")[0])
                if(curMonth === month+1) {
                    val += valArr.shift()
                    timeArr.shift()
                    monthCount++
                }
                else {
                    break
                }
            }

            if(monthCount !== 0) {
                val /= monthCount
                avgArr[month] = Math.round(val)
            }
        }

        this.setState({
            ["avg" + year]: avgArr
        })
    }

    displayTable(data) {
        if(data === 0) {
            return "EQP"
        }
        return data
    }

    render() {
        return (
            <div className="table">
                <div className="table-title">Average Reservoir Storage</div>
                <table>
                    <tbody>
                        <tr>
                            <th>{" "}</th>
                            {years.map(year => (
                                <th key={year}>
                                    {year}
                                </th>
                            ))}
                        </tr>
                        {monthNames.map((month, index) => (
                            <tr key={month}>
                                <td>{month}</td>
                                <td>{this.displayTable(this.state.avg18[index])}</td>
                                <td>{this.displayTable(this.state.avg19[index])}</td>
                                <td>{this.displayTable(this.state.avg20[index])}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="table-note">
                    <i>*EQP = Value affected by equipment malfunction.</i>
                </div>
            </div>
        )
    }
}
