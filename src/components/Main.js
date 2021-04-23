import React, { Component } from 'react'
import Selection from "./Selection"
import loadingGif from "../images/loading.gif"
import "./Main.scss"

export default class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {
                ca: [],
                az: [],
                nm: []
            }
        }
    }

    componentDidMount() {
        // fetch data in the order of CA, AZ, and NM
        let urls = [
            "https://waterservices.usgs.gov/nwis/dv/?format=json&stateCd=ca&startDT=2020-01-01&endDT=2020-12-31&parameterCd=00054&siteStatus=active",
            "https://waterservices.usgs.gov/nwis/dv/?format=json&stateCd=az&startDT=2020-01-01&endDT=2020-12-31&parameterCd=00054&siteStatus=active",
            "https://waterservices.usgs.gov/nwis/dv/?format=json&stateCd=nm&startDT=2020-01-01&endDT=2020-12-31&parameterCd=00054&siteStatus=active",
        ]
        Promise.all(
            urls.map(url =>
                fetch(url)
                    .then(response => response.json())
                    .then(data => data.value.timeSeries)
            )
        ).then(data => {
            this.setState({
                data: {
                    ca: data[0],
                    az: data[1],
                    nm: data[2]
                }
            })
        })
    }

    render() {
        if(this.state.data.ca.length === 0 || this.state.data.az.length === 0 || this.state.data.nm.length === 0) {
            return (
                <div className="loading">
                    <img src={loadingGif} alt="Loading GIF"/>
                </div>
            )
        }
        else {
            return (
                <div className="main">
                    <Selection data={this.state.data}/>
                </div>
            )
        }
    }
}
