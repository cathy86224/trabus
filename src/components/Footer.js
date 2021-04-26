import React, { Component } from 'react'
import Logo from "../images/logo.svg"

export default class Footer extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="footer">
                    <div className="logo-wrap">
                        <img src={Logo} alt="logo" />
                        Impact Through Technical Innovation
                    </div>
                    <div className="contact">
                        <div className="header">
                            <b>COMPANY</b>
                        </div>
                        <a className="item" href="https://trabus.com/about/" target="_blank" rel="noreferrer">About Us</a>
                        <a className="item" href="https://trabus.com/careers/"  target="_blank" rel="noreferrer">Careers</a>
                        <a className="item" href="https://trabus.com/contact/" target="_blank" rel="noreferrer">Contact</a>
                    </div>
                    <div className="contact">
                        <div className="header">
                            <b>SOCIAL MEDIA</b>
                        </div>
                        <a className="item" href="https://www.facebook.com/Trabus-Technologies-143543429114409/" target="_blank" rel="noreferrer">Facebook</a>
                        <a className="item" href="https://www.linkedin.com/company/trabus-technologies/"  target="_blank" rel="noreferrer">LinkedIn</a>
                    </div>
                </div>
                <div className="copyright" >
                    Copyright © 2021 TRABUS Technologies - Cathy Hsieh. All Rights Reserved.
                </div>
            </React.Fragment>
        )
    }
}
