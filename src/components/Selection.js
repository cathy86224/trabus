import React, { Component } from 'react'

const STATES = {
    ca: "California",
    az: "Arizona",
    nm: "New Mexico"
}

export default class Selection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            stateClicked: false,
            stateSelected: "",
            reservoirClicked: false,
            reservoirSelected: "",
            reservoirList: {}
        }
    }

    componentDidUpdate(prevProp, prevState) {
        if(prevState.stateSelected !== this.state.stateSelected) {
            this.setState({
                reservoirSelected: ""
            })
        }
    }

    selectionStateClicked = () => {
        this.setState({
            stateClicked: !this.state.stateClicked
        })
    }

    selectionReservoirClicked = () => {
        this.setState({
            reservoirClicked: !this.state.reservoirClicked
        })
    }

    stateItemClassName() {
        let name = "item state"
        if(this.state.stateClicked) {
            return name + " clicked"
        }
        return name
    }

    reservoirItemClassName() {
        let name = "item"
        if(this.state.reservoirClicked) {
            return name + " clicked"
        }
        return name
    }

    stateSelected = (state) => {
        this.reserviorsFilter(state)
        this.setState({
            stateSelected: state,
            stateClicked: false
        })
        this.props.getStateSelected(state)
    }

    reservoirSelected = (code) => {
        let name = this.state.reservoirList[code]
        this.setState({
            reservoirSelected: name,
            reservoirClicked: false
        })
        this.props.getReservoirSelected(code)
    }

    reserviorsFilter(state) {
        let data = this.props.data[state]
        let reservoirList = {}
        for(let site of data) {
            let code = site.sourceInfo.siteCode[0].value
            let name = site.sourceInfo.siteName.split(",")[0].toLowerCase()
            name = name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
            if(!reservoirList.hasOwnProperty(code)) {
                reservoirList[code] = name
            }
        }

        this.setState({reservoirList})
    }


    render() {
        return (
            <div className="selections">
                <div>
                    <div className="selection states" onClick={this.selectionStateClicked}>
                        {this.state.stateSelected === "" ?
                            "Select a state" :
                            (STATES[this.state.stateSelected])
                        }
                    </div>
                    {Object.keys(STATES).map(state => {
                        return (
                            <div className={this.stateItemClassName()} key={state} onClick={() => this.stateSelected(state)}>
                                {STATES[state]}
                            </div>
                        )
                    })}
                </div>
                {this.state.stateSelected !== "" && 
                <div>
                    <div className="selection reservoirs" onClick={this.selectionReservoirClicked}>
                        {this.state.reservoirSelected === "" ?
                            "Select a reservoir" :
                            this.state.reservoirSelected
                        }
                    </div>
                    {Object.keys(this.state.reservoirList).map(code => {
                        return (
                            <div className={this.reservoirItemClassName()} key={code} onClick={() => this.reservoirSelected(code)}>
                                {this.state.reservoirList[code]}
                            </div>
                        )
                    })}
                </div>
                }
            </div>
        )
    }
}
