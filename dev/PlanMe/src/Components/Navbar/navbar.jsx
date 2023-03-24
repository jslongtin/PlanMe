import React from 'react'
import './navbar.css'
import PhotoDeProfil from '../photoDeProfil/photoDeProfil'
import { useState } from 'react'
function Navbar(props) {
    // REVIEW
    let id = props.id
    let titre = props.titre
    let icone = props.icone

    let addPage = (page) => {
        let section = <div className="pageSection"><div className="iconePageSection"></div> {page.icone} </div>
    }

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

export default Navbar