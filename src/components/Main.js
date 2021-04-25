import React, { Component } from 'react'
import {urls} from "./Data"
import Selection from "./Selection"
import Chart from "./Chart"
import loadingGif from "../images/loading.gif"
import "./Main.scss"

export default class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data20: {
                ca: [],
                az: [],
                nm: []
            },
            stateSelected: "",
            reservoirSelected: ""
        }
    }

    componentDidMount() {
        // fetch data in the order of CA, AZ, and NM
        Promise.all(
            urls.map(url =>
                fetch(url)
                    .then(response => response.json())
                    .then(data => data.value.timeSeries)
            )
        ).then(data => {
            this.setState({
                data20: {
                    ca: data[0],
                    az: data[1],
                    nm: data[2]
                },
                data19: {
                    ca: data[3],
                    az: data[4],
                    nm: data[5]
                },
                data18: {
                    ca: data[6],
                    az: data[7],
                    nm: data[8]
                }
            })
        })
    }

    getStateSelected = (state) => {
        this.setState({stateSelected: state})
    }

    getReservoirSelected = (code) => {
        this.setState({reservoirSelected: code})
    }

    render() {
        let data20 = this.state.data20
        if(data20.ca.length === 0 || data20.az.length === 0 || data20.nm.length === 0) {
            return (
                <div className="loading">
                    <img src={loadingGif} alt="Loading GIF"/>
                </div>
            )
        }
        else {
            return (
                <div className="main">
                    <Selection data20={data20} getStateSelected={this.getStateSelected} getReservoirSelected={this.getReservoirSelected}/>
                    <Chart states={this.state} />
                    
                </div>
            )
        }
    }
}
