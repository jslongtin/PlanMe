import React from "react";
import Menubar from '../MenuBar/Menubar'
import Page from '../Pages/page'
import './dashboard.css'

function Dashboard() {
    return (
        // objet menubar dans la page 
        // ref: w3school , page des components 
        <div id="dashboard">
            <div id="navBarContainer"> <Menubar /></div>
            <div id="pageContainer"> <Page/> </div>
        </div>

    )
}


export default Dashboard