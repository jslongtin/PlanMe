import React from 'react'
import './MenuBar.css'
import PhotoDeProfil from '../photoDeProfil/photoDeProfil'

function Menubar() {
    return (
        <div id="menuBar">
            <div id="menuTopSection">
                <div className="pdp"> <PhotoDeProfil /> </div>
                {/* TODO */}
                {/* allet chercher le nom de l'utilisateeur */}
                <div id="navBarUsername">hello Kitty's Plan Me</div>
                <div className="search"></div>
            </div>
            <div id="menuPages"></div>
        </div>
    )
}

export default Menubar