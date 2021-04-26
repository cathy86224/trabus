import React, { Component } from 'react'
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet"
import "./MapDisplay.scss"

const DEFAULT_POSITION = [36.548927, -110.093735]

export default class MapDisplay extends Component {

    constructor(props) {
        super(props)
        this.state = {
            locations: [],
            names: [],
            ids:[],
            geoState: [],
        }
    }

    componentDidMount() {
        this.getLocations()
    }

    getLocations = () => {
        let data = this.props.data
        let locations = [], ids = [], names = [], geoState = [];
        for(let state of Object.keys(data)) {
            for(let location of data[state]) {
                let lat = location.sourceInfo.geoLocation.geogLocation.latitude
                let long = location.sourceInfo.geoLocation.geogLocation.longitude
                let siteName = location.sourceInfo.siteName
                let id = location.sourceInfo.siteCode[0].value
                if(!names.includes(siteName)) {
                    names.push(siteName)
                    locations.push([lat,long])
                    ids.push(id)
                    geoState.push(state)
                }
            }
        }

        this.setState({
            locations,
            names,
            ids,
            geoState
        })
    }

    mapClassName() {
        let name = "map"
        if(this.props.resName !== "") {
            return name + " with-table"
        }
        return name
    }

    markerClicked(index) {
        let id = this.state.ids[index]
        let state = this.state.geoState[index]
        let name = this.state.names[index]
        name = name.split(",")[0].toLowerCase()
        name = name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        this.props.getStateSelected(state)
        this.props.getReservoirSelected(id)
        this.props.getReservoirSelectedName(name)
    }

    render() {
        return (
            <div className={this.mapClassName()}>
                <MapContainer center={DEFAULT_POSITION} zoom={6} maxZoom={11} minZoom={5}>
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.state.locations.map((geo, index) => (
                        <Marker 
                            key={geo[0]} 
                            position={geo}
                            eventHandlers={{
                                click: () => {
                                    this.markerClicked(index)
                                },
                            }}>
                            <Popup>
                                <div className="site-name">
                                    {this.state.names[index]}
                                </div>
                                <div className="site-id">
                                    Site code: {this.state.ids[index]}
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        )
    }
}
