import React, { Component } from 'react'

export default class Chart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            time: [],
            value: []
        }
    }

    componentDidUpdate(prevProp) {
        if(prevProp.resName !== this.props.resName) {
            this.getValues()
        }
    }

    getValues = () => {
        let data = this.props.data[this.props.state]
        let value = 0
        // console.log(data)
        // for(let reservoir of data) {
        //     let val = reservoir.values
        //     console.log(val)
        // }
    }

    render() {
        return (
            <div className="chart">
                
            </div>
        )
    }
}
