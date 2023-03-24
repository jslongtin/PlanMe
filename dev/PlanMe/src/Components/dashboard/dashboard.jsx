import React from "react";
import Navbar from '../Navbar/navbar'
import Page from '../Pages/page'
import './dashboard.css'

function Dashboard() {
    return (
        // objet menubar dans la page 
        // ref: w3school , page des components 
        <div id="dashboard">
            <div id="navBarContainer"> <Navbar /></div>
            <div id="pageContainer"> <Page/> </div>
        </div>

    )
}


export default Dashboard