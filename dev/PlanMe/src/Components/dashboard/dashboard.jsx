import React, { Component } from 'react'
import Menubar from '../MenuBar/Menubar'
import Page from '../Pages/Page'

export class Dashboard extends Component {
    render() {
        return (
            // objet menubar dans la page 
            // ref: w3school , page des components 
            <div id="dashboard">
                <div><Menubar /></div>
                <div id="pageContainer"><Page/></div>
            </div>

        )
    }
}

export default Dashboard