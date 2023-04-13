import React from 'react'
import './navbar.css'
import PhotoDeProfil from '../photoDeProfil/photoDeProfil'
import { useState } from 'react'
import Page from '../Pages/page'
function Navbar(props,{onPageChange}) {
    // REVIEW
    let id = props.id
    let titre = props.titre
    let icone = props.icone

    // ref: https://dev.to/francodalessio/understanding-react-elements-and-jsx-4dc3
    // aide création attributs 
    // REVIEW
    const addPage = (page) => {
        let section = <div className="pageSection"><div className="iconePageSection"></div> {page.icone} </div>
        ReactDOM.render(
            section,
            document.getElementById('menuPages')
        );
    }
    const username = sessionStorage.getItem('username');
    return (
        <div id="menuBar">
            <div id="menuTopSection">
                <div className="pdp"> <PhotoDeProfil /> </div>
                {/* TODO */}
                {/* allet chercher le nom de l'utilisateeur */}
                <div id="navBarUsername">username : {username}</div>
                <button onClick={() => {
                sessionStorage.clear(); // Clear all items from sessionStorage
                onPageChange("register"); // Redirect to register page
                }}>Logout</button>

                <div className="search"></div>
            </div>
            // REVIEW
            <div id="menuPages"><div className="pageSection"><img src="../../src/assets/images/arrow.jpg" alt="fleche" /><div className="iconePageSection">allo</div> <div className="textPageSection"> texte</div> </div></div>
            {/* <div id="menuPages">{addPage}</div> */}
        </div>

    )
}


export default Navbar