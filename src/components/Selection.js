import React, { Component } from 'react'
import Logo from "../images/logo.svg"

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
            reservoirList: {},
            markerSelected: []
        }
    }

    componentDidUpdate(prevProp, prevState) {
        if(prevState.stateSelected !== this.state.stateSelected) {
            let reservoirSelected = ""
            this.setState({
                reservoirSelected
            })
        }
        if(prevProp.reservoirSelectedName !== this.props.reservoirSelectedName) {
            this.setState({
                markerSelected: this.props.mapClicked,
                // stateSelected: "",
                // reservoirSelected: ""
            })
        }
    }

    getReservoirName(data) {
        let reservoirSelected = data.filter(site => (site.sourceInfo.siteCode[0].value === this.props.mapSelectedRes) && (site.values[0].value.length !== 0))[0].sourceInfo.siteName
        reservoirSelected = reservoirSelected.split(",")[0].toLowerCase()
        reservoirSelected = reservoirSelected.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        return reservoirSelected
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
        this.props.getReservoirSelectedName(name)
    }

    reserviorsFilter(state) {
        let data = this.props.data20[state]
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
                <img className="logo" src={Logo} alt="Trabus logo"/>
                <div className="selection-wrap states">
                    <div className="selection states" onClick={this.selectionStateClicked}>
                        {this.state.stateSelected === "" ?
                            "Select a state" :
                            (STATES[this.state.stateSelected])
                        }
                    </div>
                    <div className="items">
                        {Object.keys(STATES).map(state => {
                            return (
                                <div className={this.stateItemClassName()} key={state} onClick={() => this.stateSelected(state)}>
                                    {STATES[state]}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="selection-wrap reservoir">
                    {this.state.stateSelected !== "" ?
                    <div>
                        <div className="selection reservoirs" onClick={this.selectionReservoirClicked}>
                            {this.state.reservoirSelected === "" ?
                                "Select a reservoir" :
                                this.state.reservoirSelected
                            }
                        </div>
                        <div className="items reservoir">
                            {Object.keys(this.state.reservoirList).map(code => {
                                return (
                                    <div className={this.reservoirItemClassName()} key={code} onClick={() => this.reservoirSelected(code)}>
                                        {this.state.reservoirList[code]}
                                    </div>
                                )
                            })}
                        </div>
                    </div> :
                    <div>
                        <div className="selection disable">
                            Select a reservoirs
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
}
